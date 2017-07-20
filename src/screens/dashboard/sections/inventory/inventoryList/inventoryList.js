import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

// Using to make nmultiline ediing for description
function multilineCell(cell, row) {
    return "<textarea class='form-control cell' rows='3'>" + cell +"</textarea>";
} 

function onAfterSaveCell(row, cellName, cellValue) {
}

// Todo: Do validation here
// Do not do synchronous as it will block the browser
// Save item to database here and then setState to reflect changes on client side
function onBeforeSaveCell(row, cellName, cellValue) {
	console.log("At onBeforeSaveCell");
	console.log("row is: ", row);
	console.log("cellName is: ", cellName);
	console.log("cellValue is: ", cellValue);
	// Todo: Do some validation here
	
	// Update item atttributes in database
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/items/' + row["inventory_item_id"];
		
	// Note: Doing all this since, need old values also as updates only with whatever passed in.
	// Other values get deleted.
	var name = row["name"];
	var price = row["price"];
	var description = row["description"];
	if(cellName == "name"){name = cellValue;}
	else if (cellName == "price"){price = cellValue;}
	else if(cellName == "description"){description = cellValue;}
	else{console.log("onBeforeSaveCell error now.");}
	var inventoryItemDetails = {
		"name": name,
		"price": price,
		"description": description
	};
	console.log("onBeforeSaveCell: inventoryItemDetails is: ", inventoryItemDetails);
	var body = JSON.stringify({
		"inventory_item": inventoryItemDetails
	});
	var request = new Request(url, {
		method: 'PUT',
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
		}),
		body: body
	});
	var thisContext = this;
	console.log("onBeforeSaveCell: Sending request to update inventory item.");					
	// Todo: Need a loading here.
	fetch(request).then(
		function(response) {
			if (response.status !== 200) {   
				console.log('onBeforeSaveCell: Looks like there was a problem. Status Code: ' +  response.status); 
				alert("onBeforeSaveCell: Some error saving data. Try again later. Status Code: ", response.status);
				return;
			}
			// Get response from Koin server and update table data to reflect change in client view
			response.json().then(function(data) {
				console.log("onBeforeSaveCell: data from server is: ", data);
				
				// Update tablesData state to reload new date onto client side.
				var tablesData = thisContext.state.tablesData;
				console.log("onBeforeSaveCell: tablesData is: ", tablesData);
				var i;
				var catgeory = row["category_name"];
				for(i = 0;i<tablesData[catgeory].length; i++){
					if(tablesData[catgeory][i]["inventory_item_id"] == data["inventory_item"]["inventory_item_id"]){
						console.log("onBeforeSaveCell: Item updated is: ", tablesData[catgeory][i]);
						tablesData[catgeory][i]["name"] = data["inventory_item"]["name"];
						tablesData[catgeory][i]["price"] = data["inventory_item"]["price"];
						tablesData[catgeory][i]["description"] = data["inventory_item"]["description"];
						break;
					}
				}
				console.log("onBeforeSaveCell: Setting state for tablesData.");
				thisContext.setState({
					tablesData: tablesData
				});
			});
		}
	);
	console.log("onBeforeSaveCell: Afer fetch just before return.");
	return false;
}

export default class InventoryList extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		loading: true,
      		tablesData: {}	// formatted server data fed in into table
      	}
    }

    // Fetch whole initial inventory
    componentDidMount() {
    	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/merchant';
		var request = new Request(url, {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			})
		});
		var thisContext = this; // To keep track of this context within promise callback
		console.log("componentDidMount: fetching initial inventory.");
		fetch(request).then(
	      	function(response) {
		        if (response.status !== 200) {   
		          console.log('componentDidMount: Looks like there was a problem. Status Code: ' +  response.status);  
		          return;  
		        }
	        	// Examine the text in the response from Koin server
	        	response.json().then(function(data) {  
	          		console.log("componentDidMount: data from server is: ", data);
	          		// Setup table data
	          		var tablesData = {};	// Keep track of all catgory tables
	          		var categories = data["categories"];
	          		var i, j;
	          		for(i=0; i<categories.length; i++){
	          			var categoryTable = [];	// 1 table for each category
	          			var categoryName = categories[i]["category_name"];
	          			var categoryId = categories[i]["category_id"];
	          			tablesData[categoryName] = categoryTable;
	          			for(j = 0; j<categories[i]["inventory_items"].length; j++){
	          				var inventoryEntry = {}; // This table for each inventory item
	          				inventoryEntry["inventory_item_id"] = categories[i]["inventory_items"][j]["inventory_item_id"];
	          				inventoryEntry["description"] = categories[i]["inventory_items"][j]["description"];
	          				inventoryEntry["image_url"] = categories[i]["inventory_items"][j]["image_url"];
	          				inventoryEntry["name"] = categories[i]["inventory_items"][j]["name"];
	          				inventoryEntry["price"] = categories[i]["inventory_items"][j]["price"];
	          				inventoryEntry["category_name"] = categoryName;
	          				inventoryEntry["category_id"] = categoryId;
	          				categoryTable.push(inventoryEntry);
	          			}
	          			// console.log("categoryTable is: ", categoryTable);	
	          		}
	          		console.log("tablesData is: ", tablesData);
	          		thisContext.setState({
						loading: false,
						tablesData: tablesData
					});
	          	});
	        }
	   );
    }

    renderInventoryTables(){
    	if(this.state.loading){ // Show loading screen when getting data
      		return <h3>Loading your inventory ...</h3>;
    	}
    	else
    	{
    		const options = {
				expandRowBgColor: 'rgb(242, 255, 163)',
				clearSearch: true
			};
			const cellEditProp = {
				mode: 'dbclick',
				beforeSaveCell: onBeforeSaveCell.bind(this), // a hook for before saving cell
  				afterSaveCell: onAfterSaveCell.bind(this)  // a hook for after saving cell
			};
			var tableDisplayData = [];	// final array of tables to display whole inventory
			var tablesData = this.state.tablesData;
			console.log("renderInventoryTables: tablesData is: ", tablesData);
			for (var category in tablesData) {
    			// console.log("category is: ", category);
    			var tableElement = (
    				<div key = {category}>
    					<h3 style = {{textAlign: "center"}}>{category}</h3>
    					<BootstrapTable data = {tablesData[category]} options={options} cellEdit={cellEditProp} search hover>
							<TableHeaderColumn dataField="inventory_item_id" dataAlign="center" isKey hidden dataSort>inventory_item_id</TableHeaderColumn>
							<TableHeaderColumn dataField="category_name" dataAlign="center" hidden dataSort>Category</TableHeaderColumn>
							<TableHeaderColumn dataField="name" dataAlign="center" dataSort>Name</TableHeaderColumn>
							<TableHeaderColumn dataField="image_url" dataAlign="center" dataSort tdStyle={ { whiteSpace: 'normal' } }>Image_url</TableHeaderColumn>
							<TableHeaderColumn dataField="price" dataAlign="center" width='80' dataSort>Price</TableHeaderColumn>
							<TableHeaderColumn dataField="description" dataAlign="center" tdStyle={{whiteSpace: 'normal'}}>Description</TableHeaderColumn>
						</BootstrapTable>
					</div>
    			);
    			tableDisplayData.push(tableElement);
			}
			return tableDisplayData;
    	}
    }

  	render() {
  		console.log("Rendering InventoryList component.");
    	return (
	    	<div>
				<h2>Inventory List</h2>
				<p>Can edit item categories and attribues by double clicking any item attribute.</p>
				{this.renderInventoryTables()}
			</div>
	    );
  	}
}

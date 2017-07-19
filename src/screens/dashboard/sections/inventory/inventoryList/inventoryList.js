import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


// Using to make nmultiline ediing for description
function multilineCell(cell, row) {
    return "<textarea class='form-control cell' rows='3'>" + cell +"</textarea>";
} 

function onAfterSaveCell(row, cellName, cellValue) {
	console.log("At onAfterSaveCell");
	console.log("row is: ", row);
	console.log("cellName is: ", cellName);
	console.log("cellValue is: ", cellValue);
}

// Todo: Do validation here
// Todo: Need to make the call synchronous to avoid clash with local version.
// return true on sucess, and false on failure
// Save to database here and return false if doesnt work
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
	fetch(request).then(
		function(response) {
			if (response.status !== 200) {   
				console.log('onBeforeSaveCell: Looks like there was a problem. Status Code: ' +  response.status);  
				return;  
			}
			// Examine the text in the response from Koin server
			response.json().then(function(data) {
				console.log("onBeforeSaveCell: data from server is: ", data);
			});
		}
	);

 	return true;	// Todo: make this condintional
}

export default class InventoryList extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		loading: true,
      		inventoryList: [],
      		tablesData: {}	// formatted server data fed in into table
      	}
    }

    // Fetch whole initial inventory
    componentDidMount() {
    	console.log("componentDidMount here. Going to fetch initial InventoryList");
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
	          		console.log("componentDidMount for inventoryList: data from server is: ", data);
	          		var inventoryList = thisContext.state.inventoryList;
	          		// Setup table data
	          		var categories = data["categories"];
	          		var i, j;
	          		var tablesData = {};	// Keep track of all tables
	          		for(i=0; i<categories.length; i++){
	          			var categoryTable = [];	// 1 table for each category
	          			var categoryName = categories[i]["category_name"];
	          			tablesData[categoryName] = categoryTable;
	          			for(j = 0; j<categories[i]["inventory_items"].length; j++){
	          				var inventoryEntry = {}; // This table for each inventory item
	          				inventoryEntry["inventory_item_id"] = categories[i]["inventory_items"][j]["inventory_item_id"];
	          				inventoryEntry["description"] = categories[i]["inventory_items"][j]["description"];
	          				inventoryEntry["image_url"] = categories[i]["inventory_items"][j]["image_url"];
	          				inventoryEntry["name"] = categories[i]["inventory_items"][j]["name"];
	          				inventoryEntry["price"] = categories[i]["inventory_items"][j]["price"];
	          				inventoryEntry["category_name"] = categoryName;
	          				categoryTable.push(inventoryEntry);
	          			}
	          			// console.log("categoryTable is: ", categoryTable);	
	          		}
	          		console.log("tablesData is: ", tablesData);	
	          		thisContext.setState({
						loading: false,
						inventoryList: data["categories"],
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
				beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  				afterSaveCell: onAfterSaveCell  // a hook for after saving cell
			};
			var tableDisplayData = [];	// final array of tables to display whole inventory
			var tablesData = this.state.tablesData;
			console.log("tablesData is: ", tablesData);
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

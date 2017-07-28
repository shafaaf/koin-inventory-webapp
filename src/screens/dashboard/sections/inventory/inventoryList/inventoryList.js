import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import InlineEdit from 'react-edit-inline';

require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

function beforeDeleteRow(rowKeys, row) {
	console.log("beforeDeleteRow. rowKeys is: ", rowKeys);
	console.log("beforeDeleteRow. row is: ", row);
	
}

function onAfterDeleteRow(rowKeys, row) {
	alert('The rowkey you drop: ' + rowKeys);
	console.log("onAfterDeleteRow. rowKeys is: ", rowKeys);
	console.log("onAfterDeleteRow. row is: ", row);

	// Making promises for rows selected
	var numberOfItemsToDelete = row.length;
	var deletePromises = [];
	var i;
	for(i=0; i<numberOfItemsToDelete; i++){
		var itemId = row[i]["inventory_item_id"];
		var url = `http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/items/${itemId}`;
		var request = new Request(url, {
			method: 'DELETE',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: {}
		});
		deletePromises.push(fetch(request));
	}

	console.log("onAfterDeleteRow- deletePromises is: ", deletePromises);
	Promise.all(deletePromises)
		.then(function (result) {
			console.log("onAfterDeleteRow: result is: ", result);
			// Give error messages for the ones not able to delete. Some may delete, some not.
			/* Fetch promises only reject with a TypeError when a network error occurs. Since 4xx and 5xx responses aren't network errors, 
			there's nothing to catch. You'll need to throw an error yourself to use Promise#catch.*/
		})
		.catch(function(err) {
			console.log("onAfterDeleteRow: err is: ", err);
		})
}

function onAfterSaveCell(row, cellName, cellValue) {
}

// Allow edits in table row
function onBeforeSaveCell(row, cellName, cellValue) {
	console.log("At onBeforeSaveCell. ");
	console.log("row is: ", row);

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
	fetch(request)
		.then(function(response) {
			if (response.status !== 200) {   
				console.log('onBeforeSaveCell: Looks like there was a problem. Status Code: ' +  response.status); 
				alert("onBeforeSaveCell: Some error saving data. Try again later. Status Code: ", response.status);
				return;
			}
			// Get response from Koin server and update table data to reflect change in client view
			response.json().then(function(data) {
				console.log("onBeforeSaveCell: data from server is: ", data);
				
				// Update tablesData state to reload new row values onto client side.
				var tablesData = thisContext.state.tablesData;
				console.log("onBeforeSaveCell: tablesData is: ", tablesData);
				console.log("onBeforeSaveCell: current value is: ", tablesData["Popular Items"][0]["name"]);
				
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
		})
		.catch(function(err) {
			console.log("onBeforeSaveCell: err is: ", err);
		})
	console.log("onBeforeSaveCell: Afer fetch just before return.");
	return false;
}

// ------------------------------------------------------------------------------------------------------------------

export default class InventoryList extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		loading: true,
      		tablesCategoryOrder: [],	// Used to maintain category names' order when rendering in table
      		tablesData: {},	// inventory data formatted and fed into table. Mapping from category name to inventory items
      		categoryNameToId: {}	// Keep track of category name to Id
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
	          		var tablesData = thisContext.state.tablesData;	// Keep track of all catgory tables
	          		var tablesCategoryOrder = thisContext.state.tablesCategoryOrder;	// Keep track of all catgory tables' order for rendering view
	          		var categoryNameToId = thisContext.state.categoryNameToId;	// To keep track of category name to id
	          		var categories = data["categories"];
	          		var i, j;
	          		for(i=0; i<categories.length; i++){	// Looping through each category
	          			var categoryTable = [];	// 1 table for each category
	          			var categoryName = categories[i]["category_name"];
	          			var categoryId = categories[i]["category_id"];
	          			tablesData[categoryName] = categoryTable;
	          			tablesCategoryOrder.push(categoryName);
	          			categoryNameToId[categoryName] = categoryId;
	          			
	          			for(j = 0; j<categories[i]["inventory_items"].length; j++){ // Looping through each item for thid specific category
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
	          		console.log("tablesCategoryOrder is: ", tablesCategoryOrder);
	          		console.log("categoryNameToId is: ", categoryNameToId);
	          		
	          		thisContext.setState({
						loading: false,
						tablesData: tablesData,
						tablesCategoryOrder: tablesCategoryOrder
					});
	          	});
	        }
	   );
    }

    // Called when editing category names
    // Todo: Fix case where getting called twice
    validateCategoryEdit(oldCategory, newCategory){
    	console.log("validateCategoryEdit- oldCategory is: ", oldCategory);
    	console.log("validateCategoryEdit- newCategory is: ", newCategory);
    	if(oldCategory == newCategory){	// No change in value
    		return false;
    	}

    	// Getting old category table
     	var tablesData = this.state.tablesData;
     	console.log("current tablesData is: ", tablesData);
     	console.log("current value is: ", tablesData[oldCategory]);
     	
     	if(!(oldCategory in tablesData)){	//Todo: Hack - when called second time, the old category would be gone from tablesData
     		console.log(oldCategory, "is not found in tablesData so probably second time called bug so return.");
     		return false;
     	}    		

     	// Getting categoryId of the category that is selected
     	var categoryNameToId = this.state.categoryNameToId;
     	var categoryId = categoryNameToId[oldCategory];
     	console.log("categoryNameToId is: ", categoryNameToId);
     	console.log("categoryId selected is: ", categoryId);
		
    	// Send to server to update category name
     	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/' + categoryId;
	    var data = JSON.stringify({
	    	"category_name": newCategory
	    });
	    var request = new Request(url, {
	      method: 'PUT',
	      body: data,
	      mode: 'cors',
	      headers: new Headers({
	        'Content-Type': 'application/json',
	        'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
	      })
	    });
	    var thisContext = this; // To keep track of this context within promise callback
	    fetch(request)
		    .then(function(response) {
		        if (response.status !== 200) {   
		          console.log('Looks like there was a problem. Status Code: ' +  response.status);  
		          return;  
		        }
		        // Update local state.
		        console.log("validateCategoryEdit: response is: ", response);
			    response.json().then(function(data) {  
			        console.log("validateCategoryEdit: data from server is: ", data);
			        
			        // Todo: Hack - when called second time, the old category would be gone from tablesData
			        if(!(oldCategory in tablesData)){	
			     		console.log(oldCategory, "is not found in tablesData so probably second time called bug so return.");
			     		return false;
			     	}
			     	var oldCategoryTable = tablesData[oldCategory];
			        var i;
					for(i=0; i<oldCategoryTable.length; i++){	// Replace old categoryName for all the items
						oldCategoryTable[i]["category_name"] = newCategory;
					}
					tablesData[newCategory] = tablesData[oldCategory]; // Making the new category table and deleting old one
			     	delete tablesData[oldCategory];
			     	console.log("new tablesData is: ", tablesData);

			     	// Change tablesCategoryOrder to maintain ordering when rendering table
			     	var tablesCategoryOrder = thisContext.state.tablesCategoryOrder;
			     	console.log("current tablesCategoryOrder is: ", tablesCategoryOrder);
			     	for(i=0; i<tablesCategoryOrder.length; i++){
			     		if(tablesCategoryOrder[i] == oldCategory){
			     			tablesCategoryOrder[i] = newCategory;
			     			break;
			     		}
			     	}
					
					// Adding in new categoryName in categoryNameToId
					categoryNameToId[newCategory] = categoryNameToId[oldCategory]; // Making the new category name entry in the dict
			     	delete categoryNameToId[oldCategory];
			     	console.log("new categoryNameToId is: ", categoryNameToId);

			     	console.log("new tablesCategoryOrder is: ", tablesCategoryOrder);
			     	thisContext.setState({
						tablesData: tablesData,
						tablesCategoryOrder: tablesCategoryOrder,
						categoryNameToId: categoryNameToId
					});
		        });
		    })
			.catch(function (error){
    			console.log('validateCategoryEdit: error in editing category: ', error);
  			})
    	return false; // Updating local state done after sending to server using setState
    }

    categoryNameChanged(oldCategory, newCategory) {
        console.log("======on categoryNameChanged");
    }

	handleItemsDelete = (onClick, row) => {
		console.log('handleItemsDelete: row is: ', row);
		
		// return false;
		onClick();
	}



	// Custom delete button
	createCustomDeleteButton = (onClick) => {
		return (
			<DeleteButton
				btnText='Delete selected items'
				btnContextual='btn-warning'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				onClick={ () => this.handleItemsDelete(onClick) }/>
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
				clearSearch: true,
				deleteBtn: this.createCustomDeleteButton,
				beforeDeleteRow: beforeDeleteRow,
				afterDeleteRow: onAfterDeleteRow
			};

			const cellEditProp = {
				mode: 'dbclick',
				beforeSaveCell: onBeforeSaveCell.bind(this), // a hook for before saving cell
  				afterSaveCell: onAfterSaveCell.bind(this)  // a hook for after saving cell
			};
			// If you want to enable deleteRow, you must enable row selection also.
			const selectRowProp = {
			  mode: 'checkbox'
			};

			var tableDisplayData = [];	// final array of tables to display whole inventory
			var tablesData = this.state.tablesData;
			var tablesCategoryOrder = this.state.tablesCategoryOrder;
			console.log("renderInventoryTables: tablesData is: ", tablesData);
			console.log("renderInventoryTables: tablesCategoryOrder is: ", tablesCategoryOrder);
			var tablesCategoryOrderLength = tablesCategoryOrder.length;
			var i;
			for (i = 0; i< tablesCategoryOrderLength; i++) {
				var category = tablesCategoryOrder[i];
    			// console.log("category is: ", category);
    			var tableElement = (
    				<div key = {category}>
    					<h3 style = {{textAlign: "center"}}>
    						<InlineEdit validate={this.validateCategoryEdit.bind(this, category)} activeClassName="editing" text={category} 
    						paramName="newCategory" change={this.categoryNameChanged.bind(this, category)}/>
    					</h3>
    					<BootstrapTable data = {tablesData[category]} options={options} cellEdit={cellEditProp} search hover deleteRow selectRow={ selectRowProp }>
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

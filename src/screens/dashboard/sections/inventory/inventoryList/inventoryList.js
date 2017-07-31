import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import InlineEdit from 'react-edit-inline';
import { Button, Glyphicon } from 'react-bootstrap';

import { imageFormatter } from './utils.js';

import { onSelectAllRows, onRowSelect } from './utils.js';


require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');





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
	var imageUrl = row["image_url"];
	
	if(cellName == "name"){name = cellValue;}
	else if (cellName == "price"){price = cellValue;}
	else if(cellName == "description"){description = cellValue;}
	else if(cellName == "image_url"){imageUrl = cellValue;}
	else{console.log("onBeforeSaveCell: ERROR now.");}
	var inventoryItemDetails = {
		"name": name,
		"price": price,
		"description": description,
		"image_url": imageUrl
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
				// console.log("onBeforeSaveCell: current value is: ", tablesData["Popular Items"][0]["name"]);
				
				var i;
				var catgeory = row["category_name"];
				for(i = 0;i<tablesData[catgeory].length; i++){
					if(tablesData[catgeory][i]["inventory_item_id"] == data["inventory_item"]["inventory_item_id"]){
						console.log("onBeforeSaveCell: Item updated is: ", tablesData[catgeory][i]);
						tablesData[catgeory][i]["name"] = data["inventory_item"]["name"];
						tablesData[catgeory][i]["price"] = data["inventory_item"]["price"];
						tablesData[catgeory][i]["description"] = data["inventory_item"]["description"];
						tablesData[catgeory][i]["image_url"] = data["inventory_item"]["image_url"];
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
    	this.itemsToDelete = {};
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

	//--------------------------------------------------------------------------------------------------

    // Called when editing category names
    // Todo: Fix case where getting called twice
    validateCategoryEdit(oldCategory, newCategory){
    	console.log("validateCategoryEdit- oldCategory is: ", oldCategory);
    	console.log("validateCategoryEdit- newCategory is: ", newCategory);
    	if(oldCategory == newCategory){	// No change in value
    		return false;
    	}
    	if((newCategory == null) || (newCategory == "") 
    		|| (newCategory == undefined)){	// If put in nothing as category name
    		alert("Not a proper category value.");
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
			     	thisContext.itemsToDelete = {};	// Remove items selected already for delete
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

    // Called when delete button for a table clicked on
	onDeleteButtonClick(category){
		console.log("onDeleteButtonClick called for category: ", category);
		var itemsToDelete = this.itemsToDelete;
		console.log("onDeleteButtonClick: itemsToDelete is: ", itemsToDelete);
		if(!(category in itemsToDelete)) {	// Todo: Still case of cateogry presnt with 0 items but handled as length would be 0
			console.log("No item selected for: ", category);
			return;
		}
		
		// Making promises for rows selected
		var categoryItemsToDelete = itemsToDelete[category];
		console.log("onDeleteButtonClick: categoryItemsToDelete is: ", categoryItemsToDelete);
		// var numberOfItemsToDelete = Object.keys(categoryItemsToDelete).length;
		// console.log("onDeleteButtonClick: numberOfItemsToDelete is: ", numberOfItemsToDelete);
		var deletePromises = [];
		var i;
		for(var itemId in categoryItemsToDelete){
			console.log("item is: ", categoryItemsToDelete[itemId]);
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
		console.log("onDeleteButtonClick- deletePromises is: ", deletePromises);
		var tablesData = this.state.tablesData;
		console.log("onDeleteButtonClick- tablesData is: ", tablesData);
		var that = this;
		Promise.all(deletePromises)
			.then(function (result) {
				console.log("onDeleteButtonClick: result is: ", result);
				// Give error messages for the ones not able to delete. Some may delete, some not.
				/* Fetch promises only reject with a TypeError when a network error occurs. Since 4xx and 5xx responses aren't network errors, 
				there's nothing to catch. You'll need to throw an error yourself to use Promise#catch.*/
				
				// Handle local state. Remove the items which were successfully deleted
				var i, j;
				for(i=0; i<result.length; i++){
					if(result[i]["status"] != 200){	//Todo: Confirm what to check here
						console.log("onDeleteButtonClick: result: ", i, " was not sucessful.");
						continue;
					}
					console.log("onDeleteButtonClick: result: ", i, " was sucessful.");
					var parts = result[i]["url"].split('/');
					var itemId = parts.pop() || parts.pop();	// Todo: See if better way possible
					console.log("onDeleteButtonClick: itemId is: ", itemId);
					for(j = 0; j<tablesData[category].length; j++){
						if(tablesData[category][j]["inventory_item_id"] == itemId){
							tablesData[category].splice(j, 1);
							delete itemsToDelete[category][itemId];	// Item deleted so remove from tracker
						}
					}
				}
				console.log("onDeleteButtonClick: itemsToDelete is: ", itemsToDelete);
				that.setState({
					tablesData: tablesData
				});
			})
			.catch(function(err) {
				console.log("onDeleteButtonClick: err is: ", err);
			})
		return;
	}


	// Delete a whole category table
	onDeleteCategory(category){
		console.log("onDeleteCategory called. category is: ", category);

      	var tablesCategoryOrder = this.state.tablesCategoryOrder;
		var tablesData = this.state.tablesData;
      	var categoryNameToId = this.state.categoryNameToId;
      	console.log("onDeleteCategory: categoryNameToId is: ", categoryNameToId);
      	var categoryId = categoryNameToId[category];
      	console.log(`onDeleteCategory: categoryId for ${category} is: ${categoryId}`);
      	
      	// Request to delete whole category table
      	var url = `http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/${categoryId}`;
		var request = new Request(url, {
			method: 'DELETE',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: {}
		});
		
		var that = this;
		console.log("onDeleteCategory: Sending request to delete whole category table.");					
		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {   
					console.log('onDeleteCategory: Looks like there was a problem. Status Code: ' +  response.status); 
					// alert("onDeleteCategory: Some error deleteing category table. Status Code: ", response.status);
					return;
				}
				// Get response from Koin server and update table data to reflect change in client view
				response.json().then(function(data) {
					console.log("onDeleteCategory: data from server is: ", data);					
				});
			})
			.catch(function(err) {
				console.log("onDeleteCategory: err is: ", err);
			})
	}

	// When an image is clicked on
	onImageClick(cell, row){
		console.log("onImageClick row is: ", row);
		console.log("onImageClick cell is: ", cell);
		if((cell == null) || (cell == "")){
			console.log("No image present.");
			return;
		}
	}

	//--------------------------------------------------------------------------------------------------

    renderInventoryTables(){
    	if(this.state.loading){ // Show loading screen when getting data
      		return <h3>Loading your inventory ...</h3>;
    	}
    	else
    	{
    		const options = {
				expandRowBgColor: 'rgb(242, 255, 163)',
				clearSearch: true
				// onRowClick: this.onRowClick
			};

			const cellEditProp = {
				mode: 'dbclick',
				beforeSaveCell: onBeforeSaveCell.bind(this), // a hook for before saving cell
  				afterSaveCell: onAfterSaveCell.bind(this)  // a hook for after saving cell
			};
			
			// Row selector type
			const selectRowProp = {
			  mode: 'checkbox',
			  onSelect: onRowSelect.bind(this),
			  onSelectAll: onSelectAllRows.bind(this)
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
    						<Button style = {{marginLeft: "10px"}} onClick = {this.onDeleteCategory.bind(this, category)}><Glyphicon glyph="remove" /> Delete</Button>
    					</h3>
    					<Button onClick = {this.onDeleteButtonClick.bind(this, category)}>Delete Selected Items</Button>
    					<BootstrapTable data = {tablesData[category]} options={options} cellEdit={cellEditProp} search hover selectRow={ selectRowProp }>
							<TableHeaderColumn dataField="inventory_item_id" dataAlign="center" isKey hidden dataSort>inventory_item_id</TableHeaderColumn>
							<TableHeaderColumn dataField="category_name" dataAlign="center" hidden dataSort>Category</TableHeaderColumn>
							<TableHeaderColumn dataField="name" dataAlign="center" dataSort>Name</TableHeaderColumn>
							<TableHeaderColumn dataField="price" dataAlign="center" width='80' dataSort>Price</TableHeaderColumn>
							<TableHeaderColumn dataField="description" dataAlign="center" tdStyle={{whiteSpace: 'normal'}}>Description</TableHeaderColumn>
							<TableHeaderColumn dataField="image_url" dataAlign="center" tdStyle={ { whiteSpace: 'normal' } }>Image Url</TableHeaderColumn>
							<TableHeaderColumn dataField="image_url" dataAlign="center" editable={ false } dataFormat={imageFormatter.bind(this)}>Preview</TableHeaderColumn>
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
	    	<div style = {{paddingBottom: "2%"}}>
				<h2>Your Inventory</h2>
				<p>Can edit item categories and attribues by <u>double clicking</u> on them.</p>
				{this.renderInventoryTables()}
			</div>
	    );
  	}
}

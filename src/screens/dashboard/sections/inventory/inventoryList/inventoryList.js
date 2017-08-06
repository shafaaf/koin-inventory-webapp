import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import InlineEdit from 'react-edit-inline';
import { Button, Glyphicon } from 'react-bootstrap';

import { imageFormatter } from './utils/dataFormatters';	// Data formatters
import { onSelectAllRows, onRowSelect, onDeleteButtonClick, onDeleteCategory } from './utils/deleteFromInventory';	// For selecting rows to delete
import { onAfterSaveCell, onBeforeSaveCell, categoryNameChanged, validateCategoryEdit } from './utils/editInventory';	// For selecting rows to delete

import ImageModal from './components/imageModal';	// Image Modal when clicking on an image

require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

// ------------------------------------------------------------------------------------------------------------------

export default class InventoryList extends Component {
  	constructor(props) {
    	super(props);
    	this.itemsToDelete = {};
    	this.state = {
      		loading: true,
      
      		tablesCategoryOrder: [],	// Used to maintain category names' order when rendering in table
      		tablesData: {},	// inventory data formatted and fed into table. Mapping from category name to inventory items
      		categoryNameToId: {},	// Keep track of category name to Id

      		showModal: false,
      		modalItem: null
      	}
    }

    // For modal screen
    closeModal() {
    	this.setState({ showModal: false });
  	}
  	openModal() {
    	this.setState({ showModal: true });
  	}

  	onImageClick(cell, row){
		console.log("onImageClickCalled.");
		console.log("cell is: ", cell);
		console.log("row is: ", row);
		this.setState({
	      	modalItem: row,
	      	showModal: true
    	});
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
	setTablesData(tablesData){
		console.log("inventoryList.js: setTablesData called. New value is: ", tablesData);
		this.setState({ tablesData: tablesData });
	}
	//--------------------------------------------------------------------------------------------------
	
    renderInventoryTables(){
    	var tableResponsiveSpecs = {
    		"display": true,
    		"width": null
    	};
    	var screenWidth = window.innerWidth;
    	if(screenWidth < 992){
    		tableResponsiveSpecs["display"] = false;
    	}
    	console.log("tableResponsiveSpecs is: ", tableResponsiveSpecs);
    	
    	console.log("renderInventoryTables: screenWidth is: ", screenWidth);
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
    						<InlineEdit validate={validateCategoryEdit.bind(this, category)} activeClassName="editing" text={category} 
    						paramName="newCategory" change={categoryNameChanged.bind(this, category)}/>
    						<Button style = {{marginLeft: "10px"}} onClick = {onDeleteCategory.bind(this, category)}><Glyphicon glyph="remove" /> Delete this category</Button>
    					</h3>
    					<Button onClick = {onDeleteButtonClick.bind(this, category)}>Delete Selected Items</Button>
    					<BootstrapTable data = {tablesData[category]} options={options} cellEdit={cellEditProp} search hover selectRow={ selectRowProp }>
							<TableHeaderColumn dataField="inventory_item_id" dataAlign="center" isKey hidden dataSort>inventory_item_id</TableHeaderColumn>
							<TableHeaderColumn dataField="category_name" dataAlign="center" hidden dataSort>Category</TableHeaderColumn>
							<TableHeaderColumn dataField="name" dataAlign="center" dataSort>Name</TableHeaderColumn>
							<TableHeaderColumn dataField="price" width="60" dataAlign="center" dataSort>Price</TableHeaderColumn>
							<TableHeaderColumn dataField="description" dataAlign="center"  hidden={ !tableResponsiveSpecs["display"] } tdStyle={{whiteSpace: 'normal'}}>Description</TableHeaderColumn>
							<TableHeaderColumn dataField="image_url" dataAlign="center" hidden={ !tableResponsiveSpecs["display"] } tdStyle={ { whiteSpace: 'normal' } }>Image Url</TableHeaderColumn>
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
	    		<ImageModal modalItem = {this.state.modalItem} tablesData = {this.state.tablesData} setTablesData = {this.setTablesData.bind(this)}
	    			showModal = {this.state.showModal} onHide = {this.closeModal.bind(this)}/>
				<h2>Your Inventory</h2>
				<p>Can edit item categories and attribues by <u>double clicking</u> on them.</p>
				{this.renderInventoryTables()}
			</div>
	    );
  	}
}

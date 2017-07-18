import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


export default class InventoryList extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		loading: true,
      		inventoryList: [],
      		tablesData: {}
      	}
    }
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
		
		fetch(request).then(
	      	function(response) {
		        if (response.status !== 200) {   
		          console.log('Looks like there was a problem. Status Code: ' +  response.status);  
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
	          				inventoryEntry["description"] = categories[i]["inventory_items"][j]["description"];
	          				inventoryEntry["image_url"] = categories[i]["inventory_items"][j]["image_url"];
	          				inventoryEntry["name"] = categories[i]["inventory_items"][j]["name"];
	          				inventoryEntry["price"] = categories[i]["inventory_items"][j]["price"];
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
    renderTransactionsTable(){
    	if(this.state.loading){ // Show loading screen when getting data
      		return <h3>Loading your inventory ...</h3>;
    	}
    	else
    	{
    		const options = {
				expandRowBgColor: 'rgb(242, 255, 163)',
				clearSearch: true
			};
			var tablesData = this.state.tablesData;
			var tableDisplayData = [];
			console.log("tablesData is: ", tablesData);
			for (var category in tablesData) {
    			console.log("category is: ", category);
    			var tableElement = (
    				<div>
    					<h1>{category}</h1>
    					<BootstrapTable data={tablesData[category]} hover options={ options }>
						<TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort>Name</TableHeaderColumn>
						<TableHeaderColumn dataField="image_url" dataAlign="center" dataSort>Image_url</TableHeaderColumn>
						<TableHeaderColumn dataField="price" dataSort>Price</TableHeaderColumn>
						<TableHeaderColumn dataField="description" dataAlign="center">Description</TableHeaderColumn>
						</BootstrapTable>
					</div>
    			);

    			tableDisplayData.push(tableElement);
			}
			return tableDisplayData;

    // 		return (
    // 			<BootstrapTable data={tableData} hover options={ options }>
				// <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort>Name</TableHeaderColumn>
				// <TableHeaderColumn dataField="image_url" dataAlign="center" dataSort>Image_url</TableHeaderColumn>
				// <TableHeaderColumn dataField="price" dataSort>Price</TableHeaderColumn>
				// <TableHeaderColumn dataField="description" dataAlign="center">Description</TableHeaderColumn>
				// </BootstrapTable>
    // 		);

    	}
    }

  	render() {
  		console.log("Rendering InventoryList component.");
    	return (
	    	<div>
				<h2 style = {{textAlign: "center"}}>Inventory List</h2>
				{this.renderTransactionsTable()}
			</div>
	    );
  }
}
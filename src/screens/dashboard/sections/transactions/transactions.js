import React,{Component} from 'react';
import Moment from 'react-moment';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');



// products will be presented by react-bootstrap-table
var products = [{
      id: 1,
      name: "Item name 1",
      price: 100
  },{
      id: 2,
      name: "Item name 2",
      price: 120
  }];

function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

function timeFormatter(cell, row){
	//console.log("cell is: ", cell);
	//console.log("row is: ", row);
	//return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
	var moment = require('moment');
	var a = moment(cell);
	return <p>{a.format("MMM Do YYYY")}</p>;
}


class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn dataField='fieldA' isKey={ true }>Field A</TableHeaderColumn>
          <TableHeaderColumn dataField='fieldB'>Field B</TableHeaderColumn>
          <TableHeaderColumn dataField='fieldC'>Field C</TableHeaderColumn>
          <TableHeaderColumn dataField='fieldD'>Field D</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}





export default class Transactions extends Component {
  constructor(props) {
  	super(props);
	this.state = {
		loading: true,
		transactionsList: [],
		hasNextPage: null,
		tableData: [],
		currentTransactionPage: null
	};
  }

  componentWillMount() {
  	console.log("componentWillMount here.");
  	// Todo: heard not good
  }

  // Initial fetch of merchant's transactions
  componentDidMount() {
  	console.log("componentDidMount here. Going to fetch transactions");
  	// Requesting transaction info from Koin server
	// Todo: Hard coded right now using Zen's session token
	var data = JSON.stringify({});
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/transactions/merchant/list';
	var request = new Request(url, {
		method: 'POST',
		body: data,
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'	// Zen's token hardcoded in
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
				console.log("Transaction data from server is: ", data);
				
				console.log("setting state for transactions now.");
				// Todo: get warning of setting state when component not mounted
				// Happens when click away to another section and state for old component
				// is being set
				
				// Setup table data
				var tableData = thisContext.state.tableData;
				console.log("tableData is: ", tableData);
				var dataListLength = data["transactions"].length;
				var i = 0;
				for(i = 0; i < dataListLength; i++){
					var myEntry = {};
					myEntry["dateTime"] = data["transactions"][i]["created_at"];
					myEntry["amount"] = data["transactions"][i]["amount"];
					myEntry["storeName"] = data["transactions"][i]["merchant"]["store_name"];
					myEntry["state"] = data["transactions"][i]["state"];
					tableData.push(myEntry);
				}

				thisContext.setState({
					loading: false,
					transactionsList: data["transactions"],
					hasNextPage: data["has_next_page"],
					tableData: tableData,
					currentTransactionPage: 1
				 });
			});
		}
	);
	console.log("After promise section in componentDidMount transactions fetch.");
  }

	componentWillUnmount(){
		console.log("componentWillUnmount here.");
	}


  // Todo: Figure out how to other fetch data here later on.
  fetchDifferentIndexTransactions(direction) {
  	console.log("fetchDifferentIndexTransactions: direction is: ", direction);
  	console.log("current index is: ", this.state.currentTransactionPage);
  	var currentIndex = this.state.currentTransactionPage;
  	
  	// Todo: perform checks to see if possible or not to get other index
  	if(direction == "prev") {
  		currentIndex = currentIndex - 1;
  		if(currentIndex < 1){
  			console.log("currentIndex<1 so returning");
  			return;
  		}
  	}
  	else if(direction == "next"){
  		currentIndex = currentIndex + 1;
  		if(!this.state.hasNextPage){
  			console.log("Theres no more pages.");
  			return;
  		}
  	}
  	else{
  		console.log("Some weird error!");
  	}
  	var data = JSON.stringify({});
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/transactions/merchant/list?page=' + currentIndex;
	var request = new Request(url, {
		method: 'POST',
		body: data,
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'
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
				console.log("transaction data from server is: ", data);
				console.log("setting state for transactions now.");
				// Todo: get warning of setting state when component not mounted
				// Happens when click away to another section and state for old component
				// is being set
				//

				// thisContext.setState({
				// 	loading: false,
				// 	transactions: data,
				// 	transactionsArray: data["transactions"],
				// 	currentTransactionPage: currentIndex,
				// 	hasNextPage: data["has_next_page"]
				//  });
			});
			console.log("after then statement");
		}
	);
	console.log("after fetch");
	// thisContext.setState({
	// 	loading: true
	// });
  }

	isExpandableRow(row) {
		if (row.id < 3) return true;
		else return false;
	}

	expandComponent(row) {
    return (
      <h1>Hi Guys</h1>
    );
  }


  render() {
  	console.log("Rendering transactions component.");
    if(this.state.loading){	// Show loading screen when getting data
    	return <h2>Loading your transactions ..</h2>;
    }
    else{	// Show transactions data
	    return (
	    	<div>
				<h2>Your Transactions!</h2>
				<p>Fell free to check out your transactions!</p>
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"prev")}>Prev</button>
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"next")}>Next</button>

				<h3>Sample table</h3>		
				<BootstrapTable data={products} striped={true} hover={true} expandableRow={ this.isExpandableRow }
				expandComponent={ this.expandComponent }>
					<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
					<TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
				</BootstrapTable>

				<h3>Final table</h3>
				<BootstrapTable data={this.state.tableData} striped={true} hover={true}>
					<TableHeaderColumn dataField="dateTime" dataFormat={timeFormatter} isKey={true} dataAlign="center" dataSort={true}>DateTime</TableHeaderColumn>
					<TableHeaderColumn dataField="amount" dataFormat={priceFormatter} dataSort={true}>Amount</TableHeaderColumn>
					<TableHeaderColumn dataField="storeName" dataSort={true}>Store Name</TableHeaderColumn>
					<TableHeaderColumn dataField="state" dataSort={true}>State</TableHeaderColumn>
				</BootstrapTable>
				
				
				{/* Not working for now*/}
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"prev")}>Prev</button> 
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"next")}>Next</button>
				
			</div>
	    );
	}
  }

}
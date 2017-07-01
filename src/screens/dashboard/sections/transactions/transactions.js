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
      price: 100
  }];
// It's a data format example.
function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

export default class Transactions extends Component {
  constructor(props){
  	super(props);
	this.state = {
		loading: true,
		transactionsList: [],
		hasNextPage: null,
		currentTransactionPage: null,
		open: true
	};
  }

  componentWillMount(){
  	console.log("componentWillMount here.");
  	// Todo: heard not good
  }

  // Initial fetch of merchant's transactions
  componentDidMount(){
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
				thisContext.setState({
					loading: false,
					transactionsList: data["transactions"],
					currentTransactionPage: 1,
					hasNextPage: data["has_next_page"]
				 });
			});
		}
	);
	console.log("After promise section in componentDidMount transactions fetch.");
  }
  

  fetchDifferentIndexTransactions(direction){
  	console.log("fetchDifferentIndexTransactions: direction is: ", direction);
  	console.log("current index is: ", this.state.currentTransactionPage);
  	var currentIndex = this.state.currentTransactionPage;
  	
  	// Todo: perform checks to see if possible or not to get other index
  	if(direction == "prev"){
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
				thisContext.setState({
					loading: false,
					transactions: data,
					transactionsArray: data["transactions"],
					currentTransactionPage: currentIndex,
					hasNextPage: data["has_next_page"]
				 });
			});
			console.log("after then statement");
		}
	);
	console.log("after fetch");
	thisContext.setState({
		loading: true
	});
  }

  	formatTable(){
  		
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
				<BootstrapTable data={products} striped={true} hover={true}>
      <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
  </BootstrapTable>

				<h3>Final table</h3>
							
				

				{/* Not working for now*/}
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"prev")}>Prev</button> 
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"next")}>Next</button>
				
			</div>
	    );
	}
  }

}
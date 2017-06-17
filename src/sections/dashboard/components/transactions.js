import React,{Component} from 'react';
// import { Table } from 'react-bootstrap';

import Moment from 'react-moment';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/src/SuperResponsiveTableStyle.css'

var tableStyles = {
	overflowY: "hidden",
	overflowX: "hidden",
	borderSpacing: "15px",
	padding: "5px"
};

export default class Transactions extends Component {
  constructor(props){
  	super(props);
	this.state = {
		transactions: {},
		transactionsArray: [],
		currentTransactionPage: null,
		hasNextPage: null
	};
  }

  componentWillMount(){
  	console.log("componentWillMount here.");
  	//heard not good
  }
  
  componentDidMount(){	// Fetch merchant's transactions
  	console.log("componentDidMount here. Going to fetch transactions");
  	//Requesting transaction info from Koin server
	// Todo: Hard coded right now using Zen's session token
	var data = JSON.stringify({});
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/transactions/merchant/list';
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
					transactions: data,
					transactionsArray: data["transactions"],
					currentTransactionPage: 1,
					hasNextPage: data["has_next_page"]
				 });

			});
		}
	);
	console.log("After promise section in transactions fetch.");

  }

  renderTransactions(){
  	console.log("rendering transactions data");
  	var myTransactions = this.state.transactionsArray;
  	console.log("myTransactions is: ", myTransactions);
  	var myTransactionsItems  = myTransactions.map((singleTransactions) =>
  		<li>{singleTransactions.amount}</li>
  	);
   return myTransactionsItems;
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
					transactions: data,
					transactionsArray: data["transactions"],
					currentTransactionPage: currentIndex,
					hasNextPage: data["has_next_page"]
				 });

			});
		}
	);
  }


  render() {
  	console.log("Rendering transactions component.");
    
    if(this.state.transactionsArray.length <= 0){	// loading screen when getting data
    	return <h2>Loading your transactions ..</h2>;
    }
    else{	//show transactions data
	    return (
	    	<div>
				<h2>Your Transactions!</h2>
				<p>Fell free to check out your transactions!</p>
				<Table style = {tableStyles}>
					<Thead>
						<Tr>
							<Th>Amount</Th>
							<Th>Created At</Th>
							<Th>State</Th>
							<Th>Store Location</Th>
							<Th>Store Name</Th>
							<Th>Store Type</Th>
						</Tr>
					</Thead>
					<Tbody>
					{this.state.transactionsArray.map((transaction, key) =>
	            		<Tr>
	            			<Td>{transaction.amount}</Td>
	            			<Td>
	            				<Moment unix>{transaction.created_at}</Moment>
	            			</Td>	
	            			<Td>{transaction.state}</Td>
	            			<Td>{transaction.merchant.store_location}</Td>
	            			<Td>{transaction.merchant.store_name}</Td>
	            			<Td>{transaction.merchant.store_type}</Td>          			            		           		            			
	            		</Tr>
	          		)}
	          		</Tbody>
				</Table>
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"prev")}>Prev</button>
				<button onClick = {this.fetchDifferentIndexTransactions.bind(this,"next")}>Next</button>
			</div>
	    );
	}
  }

}
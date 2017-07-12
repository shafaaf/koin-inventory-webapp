import React,{Component} from 'react';
import Moment from 'react-moment';

import ExpandedRow from './components/expandedRow';
import MyDatePicker from './components/myDatePicker';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Grid, Row, Col, Button, Pager} from 'react-bootstrap';


require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


// Functions to format values in table
function priceFormatter(cell, row){
  return 'Tk ' + cell;
}

function timeFormatter(cell, row){
	var moment = require('moment');
	var a = moment(cell);
	return <p>{a.format("MMM Do YYYY")}</p>;
}

export default class Transactions extends Component {
  constructor(props) {
  	super(props);
	this.state = {
		loading: true,
		transactionsList: [],
		tableData: [],
		hasNextPage: null,
		currentTransactionPage: null
	};
  }

  componentWillMount() {
  	console.log("componentWillMount for transaction here.");
  	console.log("loading is: ", this.state.loading);
  	console.log("tableData is: ", this.state.tableData);
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
								
				// Setup table data
				console.log("Setting table for transactions now.");
				var tableData = thisContext.state.tableData;
				var dataListLength = data["transactions"].length;
				var i = 0;
				for(i = 0; i < dataListLength; i++){
					var myEntry = {};
					myEntry["dateTime"] = data["transactions"][i]["created_at"];
					myEntry["amount"] = data["transactions"][i]["amount"];
					myEntry["state"] = data["transactions"][i]["state"];
					
					// To show in expandable row
					myEntry["storeName"] = data["transactions"][i]["merchant"]["store_name"];
					myEntry["storeLocation"] = data["transactions"][i]["merchant"]["store_location"];
					myEntry["storeType"] = data["transactions"][i]["merchant"]["store_type"];
					tableData.push(myEntry);
				}

				console.log("Setting state for transactions now.");
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
		console.log("componentWillUnmount for transactions here.");
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
				
				// Setup table data
				console.log("Setting table for prev/next transactions now.");
				var tableData = thisContext.state.tableData;
				tableData.splice(0,tableData.length);
				var dataListLength = data["transactions"].length;
				var i = 0;
				for(i = 0; i < dataListLength; i++){
					var myEntry = {};
					myEntry["dateTime"] = data["transactions"][i]["created_at"];
					myEntry["amount"] = data["transactions"][i]["amount"];
					myEntry["state"] = data["transactions"][i]["state"];
					
					// To show in expandable row
					myEntry["storeName"] = data["transactions"][i]["merchant"]["store_name"];
					myEntry["storeLocation"] = data["transactions"][i]["merchant"]["store_location"];
					myEntry["storeType"] = data["transactions"][i]["merchant"]["store_type"];
					tableData.push(myEntry);
				}

				console.log("Setting state for transactions now.");
				thisContext.setState({
					loading: false,
					transactionsList: data["transactions"],
					hasNextPage: data["has_next_page"],
					tableData: tableData,
					hasNextPage: data["has_next_page"],
					currentTransactionPage: currentIndex
				});
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
		return true;
	}

	expandComponent(row) {
		return (
			<ExpandedRow storeName={ row.storeName } storeLocation={ row.storeLocation } storeType = {row.storeType} />
		);
	}

	renderCurrentDate(){
		// Todo: Do for Dhaka time
		var fullDate = new Date();
		console.log("fullDate is: ", fullDate);		
		
		var indexToMonth = new Array();
		indexToMonth[0] = "January";
		indexToMonth[1] = "February";
		indexToMonth[2] = "March";
		indexToMonth[3] = "April";
		indexToMonth[4] = "May";
		indexToMonth[5] = "June";
		indexToMonth[6] = "July";
		indexToMonth[7] = "August";
		indexToMonth[8] = "September";
		indexToMonth[9] = "October";
		indexToMonth[10] = "November";
		indexToMonth[11] = "December";

		var month = indexToMonth[fullDate.getMonth()];
		var year = fullDate.getFullYear();
		console.log("year is: ", year);
		console.log("month is: ", month);
		return month + " " + year;
	}

	render() {
		console.log("Rendering transactions component.");
	if(this.state.loading){	// Show loading screen when getting data
		return <h2>Loading your transactions ..</h2>;
	}
	else{	// Show transactions data
		const options = {
	  		expandRowBgColor: 'rgb(242, 255, 163)'
		};
		return (
	    	<div>
				<h2>Your Transactions!</h2>
				<p>Fell free to check out your transactions!</p>
				<MyDatePicker/>

				<Pager>
	    			<Pager.Item previous onClick = {this.fetchDifferentIndexTransactions.bind(this,"prev")}>&larr; Previous Page</Pager.Item>
				    <Pager.Item next     onClick = {this.fetchDifferentIndexTransactions.bind(this,"next")}>Next Page &rarr;</Pager.Item>
			  	</Pager>

				<h3 style = {{textAlign: "center"}}>Transactions for {this.renderCurrentDate()}</h3>
				
				<BootstrapTable data={this.state.tableData} hover={true} 
				expandableRow={ this.isExpandableRow }
				expandComponent={ this.expandComponent}
				expandColumnOptions={{expandColumnVisible: true}}>
					<TableHeaderColumn dataField="dateTime" dataFormat={timeFormatter} isKey={true} dataAlign="center" dataSort={true}>DateTime</TableHeaderColumn>
					<TableHeaderColumn dataField="amount" dataFormat={priceFormatter} dataSort={true}>Amount</TableHeaderColumn>
					<TableHeaderColumn dataField="state" dataSort={true}>State</TableHeaderColumn>
				</BootstrapTable>

				<Pager>
	    			<Pager.Item previous onClick = {this.fetchDifferentIndexTransactions.bind(this,"prev")}>&larr; Previous Page</Pager.Item>
				    <Pager.Item next     onClick = {this.fetchDifferentIndexTransactions.bind(this,"next")}>Next Page &rarr;</Pager.Item>
			  	</Pager>			
			
			</div>
	    );
	}
	}

}



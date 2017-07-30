import React,{Component} from 'react';

import ExpandedRow from './components/expandedRow';
import MyDatePicker from './components/myDatePicker';
import DropdownTimePicker from './components/dropdownTimePicker';
import { priceFormatter, timeFormatter, milliEpochToString } from './utils.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Grid, Row, Col, Button, Pager} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

// Importing styles
// import './transactions.css';

require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
var moment = require('moment');
    
export default class Transactions extends Component {
  constructor(props) {
    super(props);

    // Get Milli Epoch start time of month
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDayTime = new Date(y, m, 1);
    firstDayTime = moment(firstDayTime).valueOf();

    this.state = {
      loading: true,
      transactionsList: [],
      tableData: [],
      hasNextPage: null,
      currentTransactionPage: null,
      // Initially startTime and endTime are start of month and current date of month,
      // but gets updated from the dropdown or datepickers 
      startTime: firstDayTime,  //start of month
      endTime: (new Date).getTime() //current day of current month
    };
  }

  componentWillMount() {
    console.log("componentWillMount for transaction here.");
  }

  // Initial fetch of merchant's transactions for 
  // start of month to current date
  componentDidMount() {
    console.log("componentDidMount here. Going to fetch initial transactions");
    // Todo: Hard coded right now using Zen's session token
    var data = JSON.stringify({
      "query_parameters":
      {
        // Todo: Fix hardcoded timestamps
        "updates_after" : this.state.startTime,
        "updates_before" : this.state.endTime,
        "order" : "ASCENDING"
      }
    });
    var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/transactions/merchant/list';
    var request = new Request(url, {
      method: 'POST',
      body: data,
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
          console.log("componentDidMount: Transaction data from server is: ", data);
                  
          // Setup table data
          console.log("Setting table for transactions now.");
          var tableData = thisContext.state.tableData;
          var dataListLength = data["transactions"].length;
          var i;
          for(i = 0; i < dataListLength; i++){
            var myEntry = {};
            // To show in table view
            myEntry["dateTime"] = data["transactions"][i]["created_at"];
            myEntry["dateTimeString"] = milliEpochToString(data["transactions"][i]["created_at"]); //hiddin in table but used to search by date
            myEntry["amount"] = data["transactions"][i]["amount"];
            myEntry["state"] = data["transactions"][i]["state"];
            // To show in expandable row
            myEntry["storeName"] = data["transactions"][i]["merchant"]["store_name"];
            myEntry["storeLocation"] = data["transactions"][i]["merchant"]["store_location"];
            myEntry["storeType"] = data["transactions"][i]["merchant"]["store_type"];
            tableData.push(myEntry);
          }
          console.log("componentDidMount: tableData is: ", tableData);
          console.log("componentDidMount: Setting state for transactions now.");
          thisContext.setState({
            loading: false,
            transactionsList: data["transactions"],
            tableData: tableData,
            hasNextPage: data["has_next_page"],
            currentTransactionPage: 1
           });
        });
      }
    );
    console.log("After promise section in componentDidMount transactions fetch.");
  }

  // Todo: Figure out how to other fetch data here later on.
  fetchRestTransactions() {
    console.log("fetchRestTransactions called.");
    console.log("current index is: ", this.state.currentTransactionPage);
    var currentIndex = this.state.currentTransactionPage;
    
    // Todo: perform checks to see if possible or not to get next pages
    if(!this.state.hasNextPage){
        console.log("fetchRestTransactions: Theres no more pages.");
        return;
      }
    currentIndex = currentIndex + 1;
    var data = JSON.stringify({
      "query_parameters":
      {
        "updates_after" : this.state.startTime,
        "updates_before" : this.state.endTime,
        "order" : "ASCENDING"
      }
    });
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
          console.log('fetchRestTransactions: Looks like there was a problem. Status Code: ' +  response.status);  
          return;  
        }
        // Examine the text in the response from Koin server
        response.json().then(function(data) {  
          console.log("fetchRestTransactions: transaction data from server is: ", data);
          
          // Setup table data
          console.log("fetchRestTransactions: Setting table for transactions now.");
          var tableData = thisContext.state.tableData;
          var dataListLength = data["transactions"].length;
          var i = 0;
          for(i = 0; i < dataListLength; i++){
            var myEntry = {};
            // To show in table view
            myEntry["dateTime"] = data["transactions"][i]["created_at"];
            myEntry["dateTimeString"] = milliEpochToString(data["transactions"][i]["created_at"]); //hiddin in table but used to search by date
            myEntry["amount"] = data["transactions"][i]["amount"];
            myEntry["state"] = data["transactions"][i]["state"];
            // To show in expandable row
            myEntry["storeName"] = data["transactions"][i]["merchant"]["store_name"];
            myEntry["storeLocation"] = data["transactions"][i]["merchant"]["store_location"];
            myEntry["storeType"] = data["transactions"][i]["merchant"]["store_type"];
            tableData.push(myEntry);
          }

          console.log("fetchRestTransactions: Setting state for transactions now.");
          thisContext.setState({
            loading: false,
            transactionsList: data["transactions"],
            tableData: tableData,
            hasNextPage: data["has_next_page"],
            currentTransactionPage: currentIndex
          });
        });
        console.log("fetchRestTransactions: after then statement");
      }
    );
    console.log("fetchRestTransactions: after fetch");
  }

  fetchSpecificDatesTransactions(startTime, endTime){
    console.log("In fetchSpecificDatesTransactions");
    console.log("fetchSpecificDatesTransactions: startTime is: ", startTime);
    console.log("fetchSpecificDatesTransactions: endTime is: ", endTime);
    setTimeout(function(){
      console.log("Hi testing");
    }, 3000);

    // Todo: Hard coded right now using Zen's session token
    var data = JSON.stringify({
      "query_parameters":
      {
        // Todo: Fix hardcoded timestamps
        "updates_after" : startTime,
        "updates_before" : endTime,
        "order" : "ASCENDING"
      }
    });
    var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/transactions/merchant/list';
    var request = new Request(url, {
      method: 'POST',
      body: data,
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
          console.log("fetchSpecificDatesTransactions: Transaction data from server is: ", data);
                  
          // Setup table data
          console.log("fetchSpecificDatesTransactions: Setting table for transactions now.");
          var tableData = thisContext.state.tableData;
          tableData.splice(0,tableData.length);
          var dataListLength = data["transactions"].length;
          var i;
          for(i = 0; i < dataListLength; i++){
            var myEntry = {};
            // To show in table view
            myEntry["dateTime"] = data["transactions"][i]["created_at"];
            myEntry["amount"] = data["transactions"][i]["amount"];
            myEntry["dateTimeString"] = milliEpochToString(data["transactions"][i]["created_at"]); //hiddin in table but used to search by date
            myEntry["state"] = data["transactions"][i]["state"];
            // To show in expandable row
            myEntry["storeName"] = data["transactions"][i]["merchant"]["store_name"];
            myEntry["storeLocation"] = data["transactions"][i]["merchant"]["store_location"];
            myEntry["storeType"] = data["transactions"][i]["merchant"]["store_type"];
            tableData.push(myEntry);
          }
          console.log("fetchSpecificDatesTransactions: tableData is: ", tableData);
          console.log("fetchSpecificDatesTransactions: Setting state for transactions now.");
          thisContext.setState({
            loading: false,
            transactionsList: data["transactions"],
            tableData: tableData,
            hasNextPage: data["has_next_page"],
            currentTransactionPage: 1
           });
        });
      }
    );
    console.log("After promise section in fetchSpecificDatesTransactions transactions fetch.");
  }

  /*  Set when user selects dates from datepicker or dropdown and submits.
      Values passed here are moment objects.
  */
  setCustomTimes(startTime, endTime){
    //console.log("transactionsjs: setCustomTimes: startTime is: ", startTime);
    var milliEpochStart = startTime.valueOf();
    console.log("setCustomTimes: startTime received is: ", startTime);
    console.log("setCustomTimes: current start is: ", this.state.startTime);
    console.log("setCustomTimes: new milliEpochStart is: ", milliEpochStart);
    
    //console.log("transactionsjs: setCustomTimes: endTime is: ", endTime);
    var milliEpochEnd = endTime.valueOf();
    console.log("setCustomTimes: current end is: ", this.state.endTime);
    console.log("setCustomTimes: new milliEpochEnd is: ", milliEpochEnd);

    this.setState({
      startTime: milliEpochStart,
      endTime: milliEpochEnd,
      loading: true,
    }, this.fetchSpecificDatesTransactions(milliEpochStart, milliEpochEnd));
  }

  componentWillUnmount(){
    console.log("componentWillUnmount for transactions here.");
  }

  isExpandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return (
      <ExpandedRow exactTime = {row.dateTime} storeName={ row.storeName } storeLocation={ row.storeLocation } 
        storeType = {row.storeType} state = {row.state}/>
    );
  }

  renderTimeWindow(){
    console.log("startTime is: ", this.state.startTime);
    console.log("endTime is: ", this.state.endTime);
    var start = milliEpochToString(this.state.startTime);
    var end = milliEpochToString(this.state.endTime);
    return (start + " to " + end);
  }

  testLoad(){
    console.log("Test Load here");
  }

  renderTransactionsTable(){
    if(this.state.loading){ // Show loading screen when getting data
      return <h3>Loading your transactions ..</h3>;
    }

    else{ // Show transactions data
      const options = {
        expandRowBgColor: 'rgb(242, 255, 163)',
        clearSearch: true
      };
      return (
        <div>
          <InfiniteScroll style = {{overflow: "visible"}}next={this.fetchRestTransactions.bind(this)} hasMore={this.state.hasNextPage} 
            loader={<h3 style = {{textAlign: "center"}}>Loading More...</h3>} endMessage = {<h3 style = {{textAlign: "center"}}>End of Transactions</h3>}>
            <BootstrapTable data={this.state.tableData} hover={true} options={ options }
              search={!this.state.hasNextPage} searchPlaceholder={"Search by date, amount or state"}
              expandableRow={ this.isExpandableRow }
              expandComponent={ this.expandComponent}
              expandColumnOptions={{expandColumnVisible: true}}>
                <TableHeaderColumn width='35%' dataField="dateTime" dataFormat={timeFormatter} isKey={true} dataAlign="center" dataSort={true}>DateTime</TableHeaderColumn>
                <TableHeaderColumn dataField="amount" dataFormat={priceFormatter} dataAlign="center" dataSort={true}>Amount</TableHeaderColumn>
                <TableHeaderColumn dataField="state" dataAlign="center" dataSort={true}>State</TableHeaderColumn>
                <TableHeaderColumn dataField="dateTimeString" hidden>Date Time String</TableHeaderColumn>
            </BootstrapTable>
          </InfiniteScroll>
        </div>
      );
    }
  }

  render() {
    console.log("Rendering transactions component.");
    return (
      <div>
        <h2>Your Transactions!</h2>
        <p>You can also search or sort for any time period.</p>
        <Row className="show-grid">
          <DropdownTimePicker setCustomTimes = {this.setCustomTimes.bind(this)}/>
          <MyDatePicker setCustomTimes = {this.setCustomTimes.bind(this)}/>
        </Row>
        <h3 style = {{textAlign: "center"}}>{this.renderTimeWindow()}</h3>
        {this.renderTransactionsTable()}
      </div>
    );
  }

}
import React,{Component} from 'react';
import moment from 'moment';
import {Grid, Row, Col, Button, ButtonToolbar, DropdownButton, MenuItem, SplitButton} from 'react-bootstrap';

export default class DropdownTimePicker extends Component {
	constructor(props) {
		console.log("dropdownTimePicker: On constructor");
		super(props);
		this.handleDropdownSelection = this.handleDropdownSelection.bind(this);
		this.state = {
			dropdownButtonTitle: "This Month"
		};
	}

	handleDropdownSelection(timeWindow){
		console.log("handleDropdownSelection timeWindow is: ", timeWindow);
		this.setState({
      		dropdownButtonTitle: timeWindow["menuString"]
    	}, this.props.setCustomTimes.bind(this, timeWindow["momentObjStart"], timeWindow["momentObjEnd"]));
	}

	renderDropdownTimes(){
		//console.log("At renderDropdownTimes");

		// Pushing in day strings and respective moment objects to calculate start and end times
		var menuItemList = [];
		var menuEntry = {};
		
		menuItemList.push(
			{"momentObjStart" : moment().startOf('day'), "momentObjEnd" : moment(), "menuString" : "Today"},
			{"momentObjStart" : moment().subtract(3, 'days'), "momentObjEnd" : moment(), "menuString" :  "Last 3 Days"}, 
			{"momentObjStart" : moment().subtract(7, 'days'), "momentObjEnd" : moment(), "menuString" : "Last 7 days"}, 
			{"momentObjStart" : moment().subtract(14, 'days'),"momentObjEnd" : moment(), "menuString" : "Last 14 days"}, 
			
			{"momentObjStart" : moment().startOf("month"), 
				"momentObjEnd" : moment(), "menuString" : "This Month"},
			{"momentObjStart" : moment().subtract(1, 'months').startOf("month"), 
				"momentObjEnd" : moment().subtract(1, 'months').endOf("month"), "menuString" : "Last Month"},
			{"momentObjStart" : moment().subtract(2, 'months').startOf("month"), 
				"momentObjEnd" : moment().subtract(1, 'months').endOf("month"), "menuString" : "Last 2 Months"});
		
		menuItemList.push({"momentObjStart" : null, "momentObjEnd": null, "menuString": "lineBreak"}); // Pushing in a linebreak
		// console.log("menuItemList is: ", menuItemList);
		
		// Pushing in monthly menu items and respective moment objects
		var i;
		for(i = 1; i<=10; i++){
			var entry = {};
			entry["momentObjStart"] = moment().subtract(i, 'months').startOf("month");
			entry["momentObjEnd"] = moment().subtract(i, 'months').endOf("month");;
			entry["menuString"] = moment().subtract(i, 'months').format('MMM YYYY');
			menuItemList.push(entry);
		}
		console.log("menuItemList is: ", menuItemList);

		var menuItems = menuItemList.map((value, index) =>
			value["menuString"] == "lineBreak" ? <MenuItem key = {index} divider/>:
				<MenuItem key = {index} eventKey = {value}>{value["menuString"]}</MenuItem>
		);
		// console.log("menuItems is: ", menuItems);
		return (
			<DropdownButton bsSize="small" title={this.state.dropdownButtonTitle} id="dropdown-size-medium" 
				onSelect={(timeWindow)=>this.handleDropdownSelection(timeWindow)}>
					{menuItems}
			</DropdownButton>
		);
	}

  	render() {
    	return (
	    	<div>
				<Col xs={12} md={3}>
					<ButtonToolbar>
						{this.renderDropdownTimes()}
					</ButtonToolbar>
				</Col>
			</div>
    );
  }
}
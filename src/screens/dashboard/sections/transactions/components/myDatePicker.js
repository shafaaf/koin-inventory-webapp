import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {Grid, Row, Col, Button, ButtonToolbar, DropdownButton, MenuItem, SplitButton} from 'react-bootstrap';

// Importing styles
import './myDatePicker.css';

export default class MyDatePicker extends React.Component {
  constructor (props) {
    super(props);
    // Getting start of current month
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    firstDay = moment(firstDay);

    this.state = {
      startDate: firstDay,
      endDate: moment()
    };
  }

  renderDropdownTimes(){
    console.log("At renderDropdownTimes");
    //console.log(moment().subtract(7, 'months').format('MMM YYYY'));

    // Pushing in day strings
    var menuStrings = [];
    menuStrings.push("Today", "Last 3 Days", "Last 7 days", "Last 14 days", "This Month", "Last 60 days");
    menuStrings.push("lineBreak"); // Pushing in a linebreak
    // Pushing in month strings
    var i;
    for(i = 1; i<=10; i++){
      menuStrings.push(moment().subtract(i, 'months').format('MMM YYYY'));
    }
    console.log("menuStrings is: ", menuStrings);

    var menuItems = menuStrings.map((value, index) =>
      value=="lineBreak" ? <MenuItem key = {index} divider/>:
      <MenuItem key = {index} eventKey = {index}>{value}</MenuItem>
      );
    console.log("menuItems is: ", menuItems);
    return (
      <DropdownButton title="Current Month" id="dropdown-size-medium">
        {menuItems}
      </DropdownButton>
    );
  }

  handleStartDateChange(date) {
    console.log("handleStartDateChange: date is: ", date);
    // var milliEpoch = date.valueOf();
    // console.log("handleStartDateChange: milliEpoch is: ", milliEpoch);
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    console.log("handleEndDateChange: date is: ", date);
    this.setState({
      endDate: date
    });
  }
  
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={12} md={3}>
            <ButtonToolbar>
              {this.renderDropdownTimes()}
            </ButtonToolbar>
          </Col>
          <Col xs={12} md={3}>
            Start Date: <DatePicker selected={this.state.startDate}
                onChange={this.handleStartDateChange.bind(this)}
                   todayButton={"Select Today"} showYearDropdown  scrollableYearDropdown
                    dateFormat="DD/MM/YYYY"  maxDate={moment().add(0, "days")}/>
          </Col>
          <Col xs={12} md={3}>
            End Date: <DatePicker selected={this.state.endDate}
              onChange={this.handleEndDateChange.bind(this)}
                todayButton={"Select Today"} showYearDropdown  scrollableYearDropdown
                  dateFormat="DD/MM/YYYY"  minDate={this.state.startDate} maxDate={moment().add(0, "days")}/>
          </Col>
          <Col xs={12} md={3} style = {{textAlign: "center"}}>
            <Button onClick = {this.props.setCustomTimes.bind(this, this.state.startDate, this.state.endDate)}>Submit dates</Button>
          </Col>
        </Row>
       
      </div>
    );
  }
}

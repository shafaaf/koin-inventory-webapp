import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {Grid, Row, Col, Button} from 'react-bootstrap';

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
          <Col xs={12} md={6} style = {{textAlign: "center"}}>
            Start Date: <DatePicker selected={this.state.startDate}
                onChange={this.handleStartDateChange.bind(this)}
                   todayButton={"Select Today"} showYearDropdown  scrollableYearDropdown
                    dateFormat="DD/MM/YYYY"  maxDate={moment().add(0, "days")}/>
          </Col>
          <Col xs={12} md={6} style = {{textAlign: "center"}}>
            End Date: <DatePicker selected={this.state.endDate}
              onChange={this.handleEndDateChange.bind(this)}
                todayButton={"Select Today"} showYearDropdown  scrollableYearDropdown
                  dateFormat="DD/MM/YYYY" maxDate={moment().add(0, "days")}/>
          </Col>
        </Row>
        <Button onClick = {this.props.fetchSpecificDatesTransactions.bind(this, this.state.startDate, this.state.endDate)}>Submit dates</Button>
      </div>
    );
  }
}

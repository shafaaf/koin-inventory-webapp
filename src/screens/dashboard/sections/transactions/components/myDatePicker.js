import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {Grid, Row, Col, Button} from 'react-bootstrap';

// Importing styles
import './myDatePicker.css';

export default class MyDatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
        <Row className="show-grid">
          <Col xs={12} md={6}>
            Start Date: <DatePicker selected={this.state.startDate}
                onChange={this.handleChange}
                   todayButton={"Select Today"} showYearDropdown  scrollableYearDropdown
                    dateFormat="DD/MM/YYYY"/>
          </Col>
          <Col xs={12} md={6}>
            End Date: <DatePicker selected={this.state.startDate}
              onChange={this.handleChange}
                todayButton={"Select Today"} showYearDropdown  scrollableYearDropdown
                  dateFormat="DD/MM/YYYY"/>
          </Col>
        </Row>
    );
  }
}

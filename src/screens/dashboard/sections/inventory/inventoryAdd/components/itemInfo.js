import React,{Component} from 'react';
import {Form, Col, FormGroup, ControlLabel, FormControl, Grid, Row, HelpBlock, 
	Button, DropdownButton, MenuItem} from 'react-bootstrap';

import Category from './category.js';


export default class ItemInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//Store states of form inputs
		};
	}

	render() {
	    return (
	    	<form>
		        <Row className="show-grid">
		            <Col md={6}>
		                {/* Product Name */}
		                <FormGroup controlId="formBasicText">
		                    <ControlLabel>Product Name</ControlLabel>
		                    <FormControl type="text" placeholder="Enter text"/>
		                    <FormControl.Feedback/>
		                </FormGroup>
		            </Col>
		            <Col md={6}> 
		                {/* Price */}
		                <FormGroup controlId="formBasicText">
		                    <ControlLabel>Price</ControlLabel>
		                    <FormControl type="text" placeholder="Enter price"/>
		                    <FormControl.Feedback/>
		                    
		                </FormGroup>
		            </Col>
		        </Row>

		        <Row className="show-grid" style = {{paddingBottom:"20px"}}>
		        	<Col md={6}>
		            	{/* Description */}
			            <FormGroup controlId="formControlsTextarea">
			                <ControlLabel>Description</ControlLabel>
			                <FormControl componentClass="textarea" placeholder="Description" style={{ height: 95 }} />
			            </FormGroup>
			        </Col>
		        	<Col md={6} style = {{textAlign: "center", marginTop: "3%"}}>
		                {/* Category */}
		                <Category/>
		            </Col>
		        </Row>        
	        </form>
	    );
  }
}
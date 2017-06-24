import React,{Component} from 'react';
import {Form, Col, FormGroup, ControlLabel, FormControl, Grid, Row, HelpBlock, Button} from 'react-bootstrap';

export default class ItemInfo extends Component {
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

	        <Row className="show-grid">
	        	<Col md={6}>
	                {/* Category */}
	                <FormGroup controlId="formBasicText">
	                    <ControlLabel>Product category</ControlLabel>
	                    <FormControl type="text" placeholder="Category"/>
	                </FormGroup>
	            </Col>
	            <Col md={6}> 
	                {/* Quantity*/}
	                <FormGroup controlId="formBasicText">
	                    <ControlLabel>Quantity</ControlLabel>
	                    <FormControl type="text" placeholder="Enter text"/>
	                    <FormControl.Feedback/>
	                    
	                </FormGroup>
	            </Col>
	        </Row>

	        <Row className="show-grid">
	        	<Col md={6}>
	            	{/* Description */}
		            <FormGroup controlId="formControlsTextarea">
		                <ControlLabel>Description</ControlLabel>
		                <FormControl componentClass="textarea" placeholder="Description" style={{ height: 70 }} />
		            </FormGroup>
		         </Col>
		        <Col md={6}>
		            {/* Additional Notes */}
		            <FormGroup controlId="formControlsTextarea">
		                <ControlLabel>Additional Notes</ControlLabel>
		                <FormControl componentClass="textarea" placeholder="Notes" style={{ height: 70 }}/>
		            </FormGroup>
		        </Col>
		    </Row>         
        </form>
    );
  }
}
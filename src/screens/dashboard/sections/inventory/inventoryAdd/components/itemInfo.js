import React,{Component} from 'react';
import {Form, Col, FormGroup, ControlLabel, FormControl, Grid, Row, HelpBlock, 
	Button, DropdownButton, MenuItem} from 'react-bootstrap';

export default class ItemInfo extends Component {
	constructor(props) {
		console.log("dropdownTimePicker: On constructor");
		super(props);
		this.state = {

			// category data
			newCategorySelected: false,
			categoryDropDownTitle: "Select Category",
			catgory: null
		};
	}

	processCategoryInput(category){
		console.log("category input is: ", category);
		if(category == "New Category"){
			this.setState({
      			newCategorySelected: true,
      			categoryDropDownTitle: category
    		});
		}
		else{
			this.setState({
      			newCategorySelected: false,
      			categoryDropDownTitle: category
    		});
		}
	}

	renderCategoryInputField(){
		if(this.state.newCategorySelected){
			return (
				<form style = {{marginTop: "3%"}}>
					<FormGroup controlId="formBasicText">
					<FormControl type="text" placeholder="Enter new category"/>
					<FormControl.Feedback/>
					</FormGroup>
				</form>
			);
		}
	}

	renderCategorySelection(){
		console.log("renderCategorySelection called");
		return (
			<div>
				<DropdownButton title = {this.state.categoryDropDownTitle} id="dropdown-size-medium" 
					onSelect={(category)=>this.processCategoryInput(category)}>
					<MenuItem eventKey="New Category">New Category</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey="1">Action</MenuItem>
					<MenuItem eventKey="2">Another action</MenuItem>
					<MenuItem eventKey="3">Active Item</MenuItem>
				</DropdownButton>
				{this.renderCategoryInputField()}
			</div>
		);
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

		        <Row className="show-grid">
		        	<Col md={6}>
		            	{/* Description */}
			            <FormGroup controlId="formControlsTextarea">
			                <ControlLabel>Description</ControlLabel>
			                <FormControl componentClass="textarea" placeholder="Description" style={{ height: 95 }} />
			            </FormGroup>
			        </Col>
		        	<Col md={6} style = {{textAlign: "center", marginTop: "3%"}}>
		                {/* Category */}
		                {this.renderCategorySelection()}
		            </Col>
		        </Row>        
	        </form>
	    );
  }
}
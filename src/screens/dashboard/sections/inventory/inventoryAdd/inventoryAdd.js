import React,{Component} from 'react';

// Importing other components
import UploadImages from './components/uploadImages.js';
import Category from './components/category.js';
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap';

import ReactLoading from 'react-loading';
import Loadable from 'react-loading-overlay';


import { handleImageUpload, createCategory, createItem} from './components/apiCalls.js';


export default class InventoryAdd extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			submit: null,
			
			productName : null,
			price : null,
			description : null,
			category : null,
			uploadedImage: null,
			
			newCategoryForDropdown : null //pass down this new submitted cateogry
		};
	}

	handleSubmit(){
		console.log("InventoryAdd submission triggered");		
		var that = this;
		
		// Todo: Show loading screen
		// Todo: Make upload image and category create asynchronous

		// var handleImageUpload = handleImageUpload()
		var setupPromises = [handleImageUpload(this.state.uploadedImage), createCategory(this.state.category, this)];	// Upload image and create category if needed
		Promise.all(setupPromises)	// Todo: Fix possibility of case where category created but upload failed
		.then(function (result) {
			console.log("handleSubmit: result is: ", result);
			var uploadedImageCloudinaryUrl = result[0];
			var categoryId = result[1];
			createItem(categoryId, that)
			.then(function(result){
				console.log("result of createItem is: ", result);
				// Need to add the new category to dropdown list and remove loading screen here
				that.setState({
					newCategoryForDropdown: that.state.category,
					submit: "submitted"
				});
			})
		})
		.catch(function(err) {	// Todo: Fix this here
	  		console.log("error in upload or category create: ", err.message); // some coding error in handling happened
		});

		console.log("handleSubmit: ending statement");
	}

	// Handler for any keyboard input changes
	productNameHandleChange(event){	
		console.log("productNameHandleChange called. event is: ", event);
		this.setState({ productName: event.target.value});
	}

	priceHandleChange(event){
		console.log("priceHandleChange called. event is: ", event);
		this.setState({ price: event.target.value});
	}
	
	descriptionHandleChange(event){
		console.log("descriptionHandleChange called. event is: ", event);
		this.setState({ description: event.target.value});
	}
	
	// These components passes back respective values here
	setCategory(category){
		console.log("setCategory called. category is: ", category);
		this.setState({ category: category});
	}

	setUploadedImage(uploadedImage){
		console.log("setUploadedImage called. uploadedImage is: ", uploadedImage);
		this.setState({ uploadedImage: uploadedImage});
	}

	// Todo: Fisnish this
	renderSubmitMessage(){
		if(this.state.submit == "submitting"){
			return (
				<Alert bsStyle="info">
					<strong>Trying to submit!</strong> Best check yo self, you are not looking too good.
				</Alert>
			);	
		}
		else if(this.state.submit == "submitted"){
			return (
				<Alert bsStyle="success">
					<strong>Submission complete</strong>
				</Alert>
			);
		}
		else if(this.state.submit == "error"){
			return (
				<Alert bsStyle="danger">
					<strong>Submission error</strong>
				</Alert>
			);
		}
		else{
			return null;
		}
	}

	render() {
		return (
			<div>	
				<h2 style = {{textAlign: "center"}}>Add Item to Inventory</h2>
				<form>
					<Row className="show-grid">
						<Col md={6}>
							{/* Product Name */}
							<FormGroup controlId="formBasicText">
								<ControlLabel>Product Name</ControlLabel>
								<FormControl type="text" placeholder="Enter name" onChange={this.productNameHandleChange.bind(this)}/>
								<FormControl.Feedback/>
							</FormGroup>
						</Col>
						<Col md={6}> 
							{/* Price */}
							<FormGroup controlId="formBasicText">
								<ControlLabel>Price</ControlLabel>
								<FormControl type="text" placeholder="Enter price" onChange={this.priceHandleChange.bind(this)}/>
								<FormControl.Feedback/>
							</FormGroup>
						</Col>
					</Row>

					<Row className="show-grid" style = {{paddingBottom:"20px"}}>
						<Col md={6}>
							{/* Description */}
							<FormGroup controlId="formControlsTextarea">
								<ControlLabel>Description</ControlLabel>
								<FormControl componentClass="textarea" placeholder="Description" onChange={this.descriptionHandleChange.bind(this)}
									style={{ height: 95 }} />
							</FormGroup>
						</Col>
						<Col md={6} style = {{textAlign: "center", marginTop: "3%"}}>
							{/* Category */}
							<Category newCategoryForDropdown = {this.state.newCategoryForDropdown} setCategory = {this.setCategory.bind(this)}/>
						</Col>
					</Row>        
				</form>
				{/*  Image upload */}
				<UploadImages uploadedImage = {this.state.uploadedImage} setUploadedImage = {this.setUploadedImage.bind(this)} style = {{textAlign: "center"}}/>
				<Button bsStyle="primary" bsSize="large" block onClick = {this.handleSubmit.bind(this)}>Submit</Button>
				{this.renderSubmitMessage()}
			</div>
		);
	}
}
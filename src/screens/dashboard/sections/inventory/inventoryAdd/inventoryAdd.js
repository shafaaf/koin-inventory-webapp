import React,{Component} from 'react';

// Importing other components
import UploadImages from './components/uploadImages.js';
import Category from './components/category.js';
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap';

import ReactLoading from 'react-loading';
import Loadable from 'react-loading-overlay';

import ModalPopup from './components/modal.js';


import { handleImageUpload, createCategory, createItem} from './components/apiCalls.js';


export default class InventoryAdd extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			submit: null,	// To show proper modals
			submitErrorMessage: null,	// Error message to show on modal

			productName : null,
			price : null,
			description : null,
			category : null,
			uploadedImage: null,
			uploadedImageUrl: null,
			
			newCategoryForDropdown : null //pass down this new submitted cateogry
		};
	}

	// Called when click submit button
	handleSubmit(){
		console.log("handleSubmit triggered");		
		var that = this;
		this.setState({
			newCategoryForDropdown: that.state.category,
			submit: "submitting"
		}, this.addItem);
	}

	// Add item to Merchant inventory
	addItem(){
		console.log("addItem called");		
		var that = this;
		// Upload image and create category. Both only if needed
		var setupPromises = [handleImageUpload(this.state.uploadedImage), createCategory(this.state.category, this)];
		Promise.all(setupPromises)	// Todo: Fix possibility of case where category created but upload failed
		.then(function (result) {
			console.log("addItem: result is: ", result);
			var uploadedImageCloudinaryUrl = result[0];
			that.state.uploadedImageUrl = uploadedImageCloudinaryUrl;
			var categoryId = result[1];
			createItem(categoryId, that)	// Create item
			.then(function(result){
				console.log("result of createItem is: ", result);
				// Add the new category to dropdown list and remove loading screen here
				that.setState({
					newCategoryForDropdown: that.state.category,
					submit: "submitted"
				});
			})
			.catch(function(err) { // Catch errors due to creating item
	  			console.log("addItem: error in item create: ", err);
	  			var submitErrorMessage;
	  			if(err == "createItemError"){
	  				submitErrorMessage = "Error in creating item.";
	  			}
		  		else{
		  			console.log("WEIRD. Shouldnt come here.");
		  		}
	  			that.setState({
					submit: "error",
					submitErrorMessage: submitErrorMessage
				});
			});
		})
		.catch(function(err) {	// Catch errors due to uploading picture or creating category 
	  		console.log("addItem: error in upload or category create: ", err);
	  		var submitErrorMessage;
	  		if(err == "createCategoryError") {
	  			submitErrorMessage = "Error in creating/setting category.";
	  		}
	  		else if(err == "uploadImageError"){
	  			submitErrorMessage = "Error in uploading picture.";
	  		}
	  		else{
	  			console.log("WEIRD. Shouldnt come here.");
	  		}
			that.setState({
				submit: "error",
				submitErrorMessage: submitErrorMessage
			});
		});
		console.log("addItem: ending statement");
	}

	//--------------------------------------------------------------------------------------------------
	
	// Handler for any keyboard input changes
	productNameHandleChange(event){	
		// console.log("productNameHandleChange called. event is: ", event);
		this.state.productName = event.target.value;
	}
	priceHandleChange(event){
		// console.log("priceHandleChange called. event is: ", event);
		this.setState({ price: event.target.value});
	}
	descriptionHandleChange(event){
		// console.log("descriptionHandleChange called. event is: ", event);
		this.setState({ description: event.target.value});
	}
	
	// To set states from lower components
	setCategory(category){
		// console.log("setCategory called. category is: ", category);
		this.setState({ category: category});
	}
	setUploadedImage(uploadedImage){
		// console.log("setUploadedImage called. uploadedImage is: ", uploadedImage);
		this.setState({ 
			uploadedImage: uploadedImage,
			uploadedImageUrl: null
		});
	}

	//--------------------------------------------------------------------------------------------------
	
	render() {
		return (
			<div>
				<ModalPopup submit = {this.state.submit} submitErrorMessage = {this.state.submitErrorMessage}/>
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
			</div>
		);
	}
}

import React,{Component} from 'react';

// Importing other components
//import Test from './components/test.js';
import UploadImages from './components/uploadImages.js';
//import ItemInfo from './components/itemInfo.js';
import Category from './components/category.js';
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap';

import ReactLoading from 'react-loading';
import Loadable from 'react-loading-overlay';

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
		
		// First create category if doesnt exist
		var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category';
		var body = JSON.stringify({
			"category_name": this.state.category
		});
		var request = new Request(url, {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: body
		});
		var thisContext = this; // To keep track of this context within promise callback
		// Todo: Show loading screen
		console.log("Sending first request to make the category if doesnt exist.");					
		fetch(request).then(	// Category create request
	      	function(response) {
		        if (response.status !== 200) {
		        	console.log('Looks like there was a problem at category create. Status Code: ' +  response.status);
		        	
		        	// Todo: Imp - Verify if can run code after setState
		        	thisContext.setState({
						submit: "error"
					});
		        	console.log('After setState in getting error for category');  
					return;  
		        }
	        	// Examine the text in the response from Koin server
	        	response.json().then(function(data) {  
	          		console.log("handleSubmit for category: data from server is: ", data);
	          		var categoryId = data["category"]["category_id"];
					
					// Need to actually create the product now after creating category.
	          		var url = "http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/" + categoryId + "/items"
					var inventoryData = [];
	          		var inventoryItem = {};
	          		inventoryItem["name"] = thisContext.state.productName;
					inventoryItem["price"] = thisContext.state.price;
	          		inventoryItem["description"] = thisContext.state.description;
	          		inventoryData.push(inventoryItem);
					var body = JSON.stringify({
						"inventory_items": inventoryData
					});
					var request = new Request(url, {
						method: 'POST',
						mode: 'cors',
						headers: new Headers({
							'Content-Type': 'application/json',
							'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
						}),
						body: body
					});
					console.log("Sending second request to make the inventory item.");
					console.log("url is: ", url, ", body is: ", body);
					console.log("Sending second request to make the inventory item. url is: ", url);
						
					fetch(request).then( // Item add request
				      	function(response) {
					        if (response.status !== 200) {   
					        	console.log('Looks like there was a problem at item create. Status Code: ' +  response.status);  
					        	// Todo: Imp - Verify if can run code after setState		        	
					        	thisContext.setState({
									submit: "error"
								});
								console.log('After setState in getting error for item');
					        	return;  
					        }
				        	// Examine the text in the response from Koin server
				        	response.json().then(function(data) {  
				          		console.log("handleSubmit for item: data from server is:", data);
				          		// Need to add the new category to dropdown list and remove loading screen here
	          					thisContext.setState({
	      							newCategoryForDropdown: thisContext.state.category,
	      							submit: "submitted"
    							});
    							// Todo: Remove loading screen.
				          	});
				        }
				   );	          		
	          	});
	        }
	   );
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
				<h2 style = {{textAlign: "center"}}>Item Information</h2>
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

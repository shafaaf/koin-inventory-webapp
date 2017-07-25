import React,{Component} from 'react';

// Importing other components
import UploadImages from './components/uploadImages.js';
import Category from './components/category.js';
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap';

import ReactLoading from 'react-loading';
import Loadable from 'react-loading-overlay';

import request from 'superagent';

// Configuration for Cloudinary
const CLOUDINARY_UPLOAD_PRESET = 'ydrh63nt';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sendkoin/upload';

export default class InventoryAdd extends Component {
	constructor(props) {
    	super(props);

    	this.uploadedImageCloudinaryUrl = null;	// new url for the image uploaded	
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

	// Upload image somewhere like S3, Cloudinary etc
	handleImageUpload(file){
		console.log("At handleImageUpload: file is: ", file);
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
		.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
		.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}
			if (response.body.secure_url !== '') {
				console.log("handleImageUpload: new uploadedImageCloudinaryUrl is:", response.body.secure_url);
				this.uploadedImageCloudinaryUrl = response.body.secure_url;
			}
		});
	}

	uploadPromise(onSuccess, onFail){
		return new Promise((resolve, reject) => {	
			var isMomHappy = true;
			if (isMomHappy) {
				var phone = {
					brand: 'Samsung',
					color: 'black'
				};
				resolve(phone); // fulfilled
			} 
			else {
				var reason = new Error('mom is not happy');
				reject(reason); // reject
			}
		})
	}

	handleSubmit(){
		console.log("InventoryAdd submission triggered");
		
		// Handle image upload to online data store
		// this.handleImageUpload(this.state.uploadedImage);
		var that = this;
		this.uploadPromise()
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log(fulfilled);
         	// output: { brand: 'Samsung', color: 'black' }
         	// First create category if doesnt exist
         	console.log("handleSubmit: fulfilled- then promise");
			var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category';
			var body = JSON.stringify({
				"category_name": that.state.category
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
			// Todo: Show loading screen
			console.log("Sending first request to make the category if doesnt exist.");					
			fetch(request).then(	// Category create request
		      	function(response) {
			        if (response.status !== 200) {
			        	console.log('Looks like there was a problem at category create. Status Code: ' +  response.status);
			        	
			        	// Todo: Imp - Verify if can run code after setState
			        	that.setState({
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
		          		inventoryItem["name"] = that.state.productName;
						inventoryItem["price"] = that.state.price;
		          		inventoryItem["description"] = that.state.description;
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
						        	that.setState({
										submit: "error"
									});
									console.log('After setState in getting error for item');
						        	return;  
						        }
					        	// Examine the text in the response from Koin server
					        	response.json().then(function(data) {  
					          		console.log("handleSubmit for item: data from server is:", data);
					          		// Need to add the new category to dropdown list and remove loading screen here
		          					that.setState({
		      							newCategoryForDropdown: that.state.category,
		      							submit: "submitted"
	    							});
	    							// Todo: Remove loading screen.
					          	});
					        }
					   );	          		
		          	});
		        }
		   );
        })
        .catch(function (error) {
        	// oops, mom don't buy it
        	console.log("promise error is: ", error.message);
        	// output: 'mom is not happy'
        });

		console.log("handleSubmit: after promise");

		
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
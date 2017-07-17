import React,{Component} from 'react';

// Importing other components
//import Test from './components/test.js';
import UploadImages from './components/uploadImages.js';
//import ItemInfo from './components/itemInfo.js';
import Category from './components/category.js';
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class InventoryAdd extends Component {
	constructor(props) {
    	super(props);
		this.state = {
			productName : null,
			price : null,
			description : null,
			category : null,
			uploadedImage: null
		};
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
							<Category setCategory = {this.setCategory.bind(this)}/>
						</Col>
					</Row>        
				</form>
				{/*  Image upload */}
				<UploadImages uploadedImage = {this.state.uploadedImage} setUploadedImage = {this.setUploadedImage.bind(this)} style = {{textAlign: "center"}}/>
				<Button bsStyle="primary" bsSize="large" block>Submit</Button>
			</div>
		);
	}
}

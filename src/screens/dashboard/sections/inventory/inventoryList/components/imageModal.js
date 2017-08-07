import React,{Component} from 'react';
import {Button, Modal, Image, Row, Col} from 'react-bootstrap';
import UploadImage from './uploadImage';
import PropTypes from 'prop-types'; // ES6 
import {handleImageUpload} from '../../inventoryAdd/components/apiCalls';

export default class ImageModal extends Component {
	constructor(props) {
		console.log("ImageModal: On constructor");
		super(props);
		// itemImageUrl is either Image url already present before clicking or file preview after upload
		this.state = {
			itemImageUrl: null,
			uploadedFile: null	// Has a value only when upload a new picture
		};
	}

	// Setting itemImageUrl state from props passed in
	componentWillReceiveProps(newProps){
		console.log("ImageModal: componentWillReceiveProps called.");
		console.log("ImageModal: oldProps is: ", this.props);
		console.log("ImageModal: newProps is: ", newProps);
		if (newProps.modalItem == null) { // Happens first time when rendering page
			return;
		}
		// Could be undefined when no image uploaded when item added first time
		this.setState({ 
			itemImageUrl: newProps.modalItem["image_url"],
			uploadedFile: null
		});
	}

	renderItemHeader(){
		if(this.props.modalItem == null){	// Happens first time when rendering page
			return <p>Nothing there bro</p>
		}
		else{
			return <h1 style = {{textAlign: "center"}}>{this.props.modalItem["name"]}</h1>;
		}
	}

	renderItemImage(){
		if(this.props.modalItem == null){ // Happens first time when rendering page
			return <p>Nothing there bro</p>
		}
		else if ((this.state.itemImageUrl == null) || (this.state.itemImageUrl == "")	// When edited image url and set to "" or null
			|| (this.state.itemImageUrl == undefined)){	// No image uploaded initially for this item
			console.log("renderItemImage: image not found. this.state.itemImageUrl is: ", this.state.itemImageUrl);
			return <h3 style = {{textAlign: "center"}}>No Image uploaded.</h3>
		}
  		else
  		{
  			return(
  				<div>
  					<Image style = {{width: "60%", display: "block", margin: "0 auto"}} src={this.state.itemImageUrl} alt="image not found" responsive />
  				</div>
  			);
  		}
  	}

  	onImageRemoveClick(){
  		console.log("onImageRemoveClick called.");
  		this.setState({
  			itemImageUrl: null,
  			uploadedFile: "noImage"
  		});
  	}

  	setUploadedImage(file){
  		console.log("setUploadedImage: file is: ", file);
  		this.setState({
  			itemImageUrl: file[0]["preview"],
  			uploadedFile: file
  		});
  	}

  	saveUpdatedItem(imageUrl){
  		console.log("saveUpdatedItem. imageUrl is: ", imageUrl);
		var modalItem = this.props.modalItem;
  		console.log("saveUpdatedItem. modalItem is: ", modalItem);
		var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/items/' + modalItem["inventory_item_id"];
		var itemDetails = {
			"name": modalItem["name"],
			"price": modalItem["price"],
			"description": modalItem["description"],
			"image_url": imageUrl
		};
		console.log("saveUpdatedItem: itemDetails is: ", itemDetails);
		var body = JSON.stringify({
			"inventory_item": itemDetails
		});
		var request = new Request(url, {
			method: 'PUT',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: body
		});
		var that = this;
		console.log("saveUpdatedItem: Sending request to update inventory item.");
		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {   
					console.log('saveUpdatedItem: Looks like there was a problem. Status Code: ' +  response.status); 
					alert("saveUpdatedItem: Some error saving data. Try again later. Status Code: ", response.status);
					return;
				}
				// Get response from Koin server and update table data to reflect change in client view
				response.json().then(function(data) {
					console.log("saveUpdatedItem: data from server is: ", data);
					
					// Update tablesData state to reload new row values onto client side.
					var tablesData = that.props.tablesData;
					console.log("saveUpdatedItem: tablesData is: ", tablesData);
					var category = that.props.modalItem["category_name"];
					var i;
					for(i = 0;i<tablesData[category].length; i++){
						if(tablesData[category][i]["inventory_item_id"] == that.props.modalItem["inventory_item_id"]){
							console.log("saveUpdatedItem: Item being updated in tables data is: ", tablesData[category][i]);
							tablesData[category][i]["image_url"] = imageUrl;
							break;
						}
					}
					console.log("saveUpdatedItem: Setting state for tablesData.");
					that.props.setTablesData(tablesData);
				});
			})
			.catch(function(err) {
				console.log("saveUpdatedItem: err is: ", err);
			})
  	}

  	onSaveImageClick(){	// When save button clicked on
  		console.log("onSaveImageClick: itemImageUrl is: ", this.state.itemImageUrl);
  		console.log("onSaveImageClick: uploadedFile is: ", this.state.uploadedFile);

  		if((this.state.uploadedFile ==  "") || (this.state.uploadedFile ==  null) || 	// Pressed save with no changes
  			(this.state.uploadedFile ==  undefined)){
  			console.log("onSaveImageClick: No file uploaded so pressed save with no changes.");
  			return;
  		}

  		else if(this.state.uploadedFile ==  "noImage"){ // Removed image and saves
  			console.log("onSaveImageClick: User removed image and wants to save like this.")
  			this.saveUpdatedItem(null);
  		}
  		else{ // Added in a new picture
  			console.log("onSaveImageClick: Uploading to cloudinary and sending to server.");
	  		var that = this;
	  		handleImageUpload(this.state.uploadedFile)
				.then(function(response) {
					console.log("onSaveImageClick: response is: ", response);
					that.saveUpdatedItem(response);
				})
				.catch(function(err) {
					console.log("onSaveImageClick: err is: ", err);
				})
		}
  	}

  	renderSaveRemoveButtonsformat(){
  		if(this.state.itemImageUrl){	// An image exists so 2 buttons for save and remove image
  			return(
	  			<Row className="show-grid" style = {{textAlign: "center", marginTop: "4%"}}>
					<Col md={6} mdPush={6} style = {{marginTop: "2%"}}>
						<Button onClick = {this.onImageRemoveClick.bind(this)} style = {{ margin: "auto"}} bsStyle="danger" bsSize="large">Remove Image</Button>
					</Col>
					<Col md={6} mdPull={6} style = {{marginTop: "2%"}} >
						<Button onClick = {this.onSaveImageClick.bind(this)} bsStyle="success" bsSize="large">Save this image</Button>
					</Col>
				</Row>
			);			
  		}
  		else{ // An image doesnt exist so 1 buttons for saving with no image
  			return(
  				<div style = {{marginTop: "2%", textAlign: "center"}}>
  					<Button onClick = {this.onSaveImageClick.bind(this)} bsStyle="success" bsSize="large">Save with no image.</Button>
  				</div>
  			);
  		}
  	}

	render() {
		console.log("ImageModal: render- modalItem is: ", this.props.modalItem);
		return (
			<div>
				<Modal bsSize="large" show={this.props.showModal} onHide={this.props.onHide}>
					<Modal.Header closeButton>
						{this.renderItemHeader()}
					</Modal.Header>
					<Modal.Body>
						{this.renderItemImage()}
						<UploadImage itemImageUrl = {this.state.itemImageUrl} setUploadedImage = {this.setUploadedImage.bind(this)}/>
						{this.renderSaveRemoveButtonsformat()}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.props.onHide}>Cancel</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

ImageModal.propTypes = {
    modalItem: PropTypes.object,
    tablesData: PropTypes.object.isRequired,
    setTablesData: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
}

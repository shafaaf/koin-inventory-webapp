import React,{Component} from 'react';
import {Button, Modal, Image, Row, Col} from 'react-bootstrap';
import UploadImage from './uploadImage';

export default class ImageModal extends Component {
	constructor(props) {
		console.log("ImageModal: On constructor");
		super(props);
		// itemImage is either Image url already present before clicking or file preview after upload
		this.state = {
			itemImage: null
		};
	}

	// Setting itemImage state from props passed in
	componentWillReceiveProps(newProps){
		console.log("ImageModal: componentWillReceiveProps called.");
		console.log("ImageModal: oldProps is: ", this.props);
		console.log("ImageModal: newProps is: ", newProps);
		if ((newProps.modalItem == null) || (newProps.modalItem == "") || (newProps.modalItem == undefined)) {
			return;
		}
		// Could be undefined when no image uploaded when item added
		this.setState({ itemImage: newProps.modalItem["image_url"] });
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
		else if ((this.state.itemImage == null) || (this.state.itemImage == "")	// When edit image url and set to "" or null
			|| (this.state.itemImage == undefined)){	//No image uploaded initially for this item
			console.log("renderItemImage: image not found. this.state.itemImage is: ", this.state.itemImage);
			return <h3 style = {{textAlign: "center"}}>No Image uploaded.</h3>
		}
  		else
  		{
  			return(
  				<div>
  					<Image style = {{width: "60%", display: "block", margin: "0 auto"}} src={this.state.itemImage} alt="image not found" responsive />
  				</div>
  			);
  		}
  	}

  	onImageRemoveClick(){
  		console.log("onImageRemoveClick called.");
  		this.setState({
  			itemImage: null
  		});
  	}

  	setUploadedImage(itemImage){
  		console.log("setUploadedImage: itemImage is: ", itemImage);
  		this.setState({
  			itemImage: itemImage
  		});
  	}

  	renderSaveRemoveButtonformat(){
  		if(this.state.itemImage){	// An image exists so 2 buttons
  			return(
	  			<Row className="show-grid" style = {{marginTop: "2%"}}>
					<Col md={6} mdPush={6} style = {{textAlign: "center"}}>
						<Button onClick = {this.onImageRemoveClick.bind(this)} style = {{ margin: "auto"}} bsStyle="danger" bsSize="large">Remove Image</Button>
					</Col>
					<Col md={6} mdPull={6} style = {{textAlign: "center"}}>
						<Button bsStyle="success" bsSize="large">Save this image</Button>
					</Col>
				</Row>
			);			
  		}
  		else{
  			return(
  				<div style = {{marginTop: "2%", textAlign: "center"}}>
  					<Button bsStyle="success" bsSize="large">Save with no image.</Button>
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
						<UploadImage itemImage = {this.state.itemImage} setUploadedImage = {this.setUploadedImage.bind(this)}/>
						{this.renderSaveRemoveButtonformat()}
							

					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.props.onHide}>Cancel</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

import React,{Component} from 'react';
import {Button, Modal, Image} from 'react-bootstrap';
import EditImage from './editImage';

export default class ImageModal extends Component {
	constructor(props) {
		console.log("ImageModal: On constructor");
		super(props);
		if(this.props.modalItem == null){
			this.state = {
				itemImage: null,
				itemImageUrl: null
			};
		}
		else {
			this.state = {
				itemImage: this.props.modalItem["image_url"]
			};
		}
	}

	setImage(itemImage, itemImageUrl){
		console.log("setUploadedImage: itemImage is: ", itemImage);
		console.log("setUploadedImage: itemImageUrl is: ", itemImageUrl);
		this.setState({ 
			itemImage: itemImage,
			itemImageUrl: itemImageUrl
		});
	}

	componentWillReceiveProps(newProps){
		console.log("ImageModal: componentWillReceiveProps called.");
		console.log("ImageModal: oldProps is: ", this.props);
		console.log("ImageModal: newProps is: ", newProps);
		if(newProps.modalItem == null){
			return;
		}
		if(newProps.modalItem != this.props.modalItem){
			console.log("ImageModal: different props received.")
			this.setState({ itemImage: newProps.modalItem["image_url"] });
		}
	}

	renderItemHeader(){
		if(this.props.modalItem == null){
			return <p>Nothing there bro</p>
		}
		else{
			return <h1 style = {{textAlign: "center"}}>{this.props.modalItem["name"]}</h1>;
		}
	}

	renderItemInfo(){
		if(this.props.modalItem == null){
			return <p>Nothing there bro</p>
		}
		else if ((this.state.itemImage == null) || (this.state.itemImage == "") 
			|| (this.state.itemImage == undefined)){	//No image uploaded for this item
			console.log("renderItemInfo: image not found. this.state.itemImage is: ", this.state.itemImage);
			return <h3 style = {{textAlign: "center"}}>No Image uploaded.</h3>
		}
  		else
  		{
  			return(
  				<div>
  					{/*<Image style = {{width: "60%", display: "block", margin: "0 auto"}} src={this.props.modalItem["image_url"]} alt="image not found" responsive />*/}
  					<Image style = {{width: "60%", display: "block", margin: "0 auto"}} src={this.state.itemImage} alt="image not found" responsive />
  				</div>
  			);
  		}
  	}
  	setUploadedImage(){
  		this.setState({

  		});
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
						{this.renderItemInfo()}
					</Modal.Body>
					<EditImage itemImage = {this.state.itemImage} setImage = {this.setImage.bind(this)} style = {{textAlign: "center"}}/>
					<Modal.Footer>
						<Button onClick={this.props.onHide}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

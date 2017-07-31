import React,{Component} from 'react';
import {Button, Modal, Image} from 'react-bootstrap';

export default class ImageModal extends Component {
	constructor(props) {
		console.log("ImageModal: On constructor");
		super(props);
	}

	renderItemHeader(){
		if(this.props.modalItem == null){
			return <p>Nothing there bro</p>
		}
		else{
			return <Modal.Title>{this.props.modalItem["name"]}</Modal.Title>;
		}
	}

	renderItemInfo(){
		if(this.props.modalItem == null){
			return <p>Nothing there bro</p>
		}
  		else
  		{
  			return( 
  				<div>
  					<Image style = {{width: "60%", display: "block", margin: "0 auto"}} src={this.props.modalItem["image_url"]} alt="image not found" responsive />
  				</div>
  			);
  		}
  	}


	render() {
		console.log("ImageModal: modalItem is: ", this.props.modalItem);
		return (
			<div>
				<Modal bsSize="large" show={this.props.showModal} onHide={this.props.onHide}>
					<Modal.Header closeButton>
						{this.renderItemHeader()}
					</Modal.Header>
					<Modal.Body>
						{this.renderItemInfo()}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.props.onHide}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

}

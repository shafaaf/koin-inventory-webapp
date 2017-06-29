import React,{Component} from 'react';
import {Button, Modal, Image} from 'react-bootstrap';

export default class ItemModal extends Component {
	constructor(props) {
		console.log("ItemModal: On constructor");
		super(props);
	}

	renderItemHeader(){
  		if(this.props.modalProduct == null){
  			return <p>Nothing there bro</p>
  		}
  		else
  		{
  			return <Modal.Title>{this.props.modalProduct.productName}</Modal.Title>;
  		}
  	}

	renderItemInfo(){	//Todo: So weird why can access props without binding. Figure out why 
		if(this.props.modalProduct == null){
  			return <p>Nothing there bro</p>
  		}
  		else
  		{
  			return( 
  				<div>
  					<p>Price: {this.props.modalProduct.price}</p>
  					<p>Quantity: {this.props.modalProduct.quantity}</p>	
  					<p>Category: {this.props.modalProduct.category}</p>
  					<p>Description: {this.props.modalProduct.description}</p>
  					<p>Additional Notes: {this.props.modalProduct.additionalNotes}</p>
  					<Image style = {{width: "60%", display: "block", margin: "0 auto"}} src={this.props.modalProduct.img} alt="image not found" responsive />
  				</div>
  			);
  		}
  	}

  	render() {
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
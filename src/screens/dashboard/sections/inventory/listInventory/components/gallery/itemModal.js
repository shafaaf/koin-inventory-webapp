import React,{Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class ItemModal extends Component {
	constructor(props) {
		console.log("ItemModal: On constructor");
		super(props);
	}

	test(){
		if(this.props.modalProduct == null){
  			return <p>Nothing there bro</p>
  		}
  		else
  		{
  			return <p>Something there bro: {this.props.modalProduct.price}</p>
  		}
  	}

  	render() {
	    return (
			<div>
				<Modal bsSize="large" show={this.props.showModal} onHide={this.props.onHide}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Text in a modal is: {this.test()}</h4>
						<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
						<h4>Popover in a modal</h4>
						<h4>Tooltips in a modal</h4>
						<hr />
						<h4>Overflowing text to show scroll behavior</h4>
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.props.onHide}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
	    );
  	}
}
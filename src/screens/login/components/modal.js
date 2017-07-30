import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class View extends React.Component {
	constructor(props) {
	super(props);
	console.log("View constructor called");
	this.state = {
		isShowingModal: true
	}
}
	handleClick = () => this.setState({isShowingModal: true})
	handleClose = () => this.setState({isShowingModal: false})

	// If different props received, need to show the modal
	// componentWillReceiveProps(newProps){
	//   if(newProps.submit != this.props.submit){
	//     this.setState({isShowingModal: true})
	//   }
	// }

	render() {
		if(this.props.submit == "loading")
		{
			return(
				<div onClick={this.handleClick}>
				{
					this.state.isShowingModal &&
					<ModalContainer onClose={this.handleClose}>
					<ModalDialog onClose={this.handleClose}>
					<h1>Trying to submit item!</h1>
					<p>Item being added to inventory. Please wait!</p>
					</ModalDialog>
					</ModalContainer>
				}
				</div>
			);
		}
		else{
			return null;
		}
	}
}

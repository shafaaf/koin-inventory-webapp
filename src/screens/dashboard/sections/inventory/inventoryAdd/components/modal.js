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

  // Handle opening and closing
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})

  // Show the modal when component called again.
  // Todo: Unsure about this
  // If different props received, need to show the modal
  componentWillReceiveProps(newProps){
    if(newProps.submit != this.props.submit){
      this.setState({isShowingModal: true})
    }
  }

  render() {
    if(this.props.submit == "submitting")
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
    else if(this.props.submit == "submitted")
    {
      return(
        <div onClick={this.handleClick}>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>Submission Successful!</h1>
                <p>
                  Your item has been added to the inventory.
                  Go to list items to see it!
                </p>
              </ModalDialog>
            </ModalContainer>
          }
        </div>
      );
    }
    else if(this.props.submit == "error")
    {
      return(
        <div onClick={this.handleClick}>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>Error Encountered!</h1>
                <p>{this.props.submitErrorMessage}</p>
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

View.propTypes = {
    submit: PropTypes.string,
    submitErrorMessage: PropTypes.string
}

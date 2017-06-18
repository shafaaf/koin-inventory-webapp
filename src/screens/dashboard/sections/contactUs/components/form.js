import React,{Component} from 'react';


// Bootstrap components
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


export default class Form extends Component {
	constructor(props) {
	    console.log("On constructor");
	    super(props);
	    this.state = {
        	value: '',
        	error: ''
      };
	}

	getNameValidationState() {	//Do all the validation checks here
		var name = this.state.value;
		if(this.state.value == "")
		{
			return 'error';
		}
		if (name.indexOf(' ') >= 0){	//checking for spaces in first name
			return 'error';
		}
		else{
			return 'success';
		}
	}

	handleChange(e) {
    	this.setState({ value: e.target.value });
  	}

	render() {
		return (
			<form>
				<FormGroup controlId="formBasicText" validationState = {this.getNameValidationState()}>
					<ControlLabel>First Name</ControlLabel>
					<FormControl type="text" placeholder="Enter text" onChange={this.handleChange.bind(this)}/>
					<FormControl.Feedback />
					<HelpBlock>{this.state.error}</HelpBlock>
				</FormGroup>
			</form>
		);
	}
}
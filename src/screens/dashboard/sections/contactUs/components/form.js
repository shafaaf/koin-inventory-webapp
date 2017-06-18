import React,{Component} from 'react';


// // Bootstrap components
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

// Form Validation components
import { ButtonInput } from 'react-bootstrap';

export default class Form extends Component {
	constructor(props) {
	    console.log("On constructor");
	    super(props);
	    this.state = {
			value: ''
		};
	}

	getValidationState(){
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}

	handleChange(e) {
    	this.setState({ value: e.target.value });
  	}

	render() {
		return (
			<form>
				<FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
					<ControlLabel>Working example with validation</ControlLabel>
					<FormControl type="text" value={this.state.value} placeholder="Enter text" onChange={this.handleChange.bind(this)}/>
					<FormControl.Feedback/>
					<HelpBlock>Validation is based on string length.</HelpBlock>
				</FormGroup>
			</form>
		);
	}
}
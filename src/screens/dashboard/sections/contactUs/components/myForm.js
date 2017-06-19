import React,{Component} from 'react';


// // Bootstrap components
import { FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button } from 'react-bootstrap';

// Form Validation components
import { ButtonInput } from 'react-bootstrap';

var style = {
    textAlign: 'center'
};

export default class myForm extends Component {
    constructor(props) {
        console.log("On constructor");
        super(props);
        this.state = {
            firstNameValue: '',
            firstNameError: 'init',

            lastNameValue: '',
            lastNameError: 'init'

        };
    }

    /* ------------------ First Name verification checks ------------------------------- */
    firstNameGetValidationState(){
        var firstNameError = this.state.firstNameError;
        if (firstNameError == '') {return 'success';}   //no error - success
        else if(firstNameError == 'init') {return 'warning';}   //initial state - warning
        else {return 'error';}  //error
    }

    firstNameHandleChange(e) {  //after entering something, will detect changes
        var firstName = e.target.value;
        if(firstName == ''){    //empty string after writing something not init
            this.setState({ 
                firstNameValue: firstName,
                firstNameError: 'empty'
            });
        }
        else if(firstName.indexOf(' ') >= 0){   // user passes in spaces
            this.setState({ 
                firstNameValue: firstName,
                firstNameError: 'spaces'
            });
        }
        else{   //no error
            this.setState({ 
                firstNameValue: firstName,
                firstNameError: ''
            });
        }
    }

    firstNameHelpMessage(){
        if(this.state.firstNameError == 'empty'){return <p>Need to enter something</p>;}
        else if(this.state.firstNameError == 'spaces'){return <p>You passed in spaces!</p>;}
        else{return null;}
    }

    /* -------------------- Last Name verification checks---------------------------------*/
    lastNameGetValidationState(){
        var lastNameError = this.state.lastNameError;
        if (lastNameError == '') {return 'success';}   //no error - success
        else if(lastNameError == 'init') {return 'warning';}   //initial state - warning
        else {return 'error';}  //error
    }

    lastNameHandleChange(e) {  //after entering something, will detect changes
        var lastName = e.target.value;
        if(lastName == ''){    //empty string after writing something not init
            this.setState({ 
                lastNameValue: lastName,
                lastNameError: 'empty'
            });
        }
        else if(lastName.indexOf(' ') >= 0){   // user passes in spaces
            this.setState({ 
                lastNameValue: lastName,
                lastNameError: 'spaces'
            });
        }
        else{   //no error
            this.setState({ 
                lastNameValue: lastName,
                lastNameError: ''
            });
        }
    }

    lastNameHelpMessage(){
        if(this.state.lastNameError == 'empty'){return <p>Need to enter something</p>;}
        else if(this.state.lastNameError == 'spaces'){return <p>You passed in spaces!</p>;}
        else{return null;}
    }
    
    /* ---------------------------------------------------------------------------------- */
    
    render() {
        return (
            <form>
                {/* First Name*/}
                <FormGroup controlId="formBasicText" validationState={this.firstNameGetValidationState()}>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text" value={this.state.firstNameValue} placeholder="Enter text" onChange={this.firstNameHandleChange.bind(this)}/>
                    <FormControl.Feedback/>
                    <HelpBlock> {this.firstNameHelpMessage()}</HelpBlock>
                </FormGroup>
            
                {/* Last Name*/}
                <FormGroup controlId="formBasicText" validationState={this.lastNameGetValidationState()}>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text" value={this.state.lastNameValue} placeholder="Enter text" onChange={this.lastNameHandleChange.bind(this)}/>
                    <FormControl.Feedback/>
                    <HelpBlock> {this.lastNameHelpMessage()}</HelpBlock>
                </FormGroup>

                {/* Email*/}
                <FormGroup controlId="formBasicText">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="text" placeholder="Enter text"/>
                    <FormControl.Feedback/>
                </FormGroup>

                {/* Text Area */}
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>My Message</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Message" />
                </FormGroup>

                 <Button bsStyle="primary" bsSize="large" block>Submit</Button>
            </form>
        );
    }
}

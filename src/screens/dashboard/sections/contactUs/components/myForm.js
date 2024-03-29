import React,{Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button } from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';

export default class myForm extends Component {
    constructor(props) {
        console.log("myForm: On constructor");
        super(props);
        this.state = {
            firstNameValue: '',
            firstNameError: 'init',

            lastNameValue: '',
            lastNameError: 'init',

            emailValue: '',
            emailError: 'init',
        };
    }

    /* ------------------ First Name verification checks ------------------------------- */
    
    firstNameGetValidationState(){
        var firstNameError = this.state.firstNameError;
        if (firstNameError == '') {return 'success';}   //no error - success
        else if(firstNameError == 'init') {return null;}   //initial state - warning
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
        else if(this.state.firstNameError == 'spaces'){return <p>You passed in spaces.</p>;}
        else{return null;}
    }

    /* -------------------- Last Name verification checks---------------------------------*/
    
    lastNameGetValidationState(){
        var lastNameError = this.state.lastNameError;
        if (lastNameError == '') {return 'success';}   //no error - success
        else if(lastNameError == 'init') {return null;}   //initial state - warning
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
        else if(this.state.lastNameError == 'spaces'){return <p>You passed in spaces.</p>;}
        else{return null;}
    }
    
    /* ---------------------- Email checks---------------------------------------- */
    
    emailGetValidationState(){
        var emailError = this.state.emailError;
        if (emailError == '') {return 'success';}   //no error - success
        else if(emailError == 'init') {return null;}   //initial state - warning
        else {return 'error';}  //error
    }

    validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emailHandleChange(e) {  //after entering something, will detect changes
        var email = e.target.value;
        if(email == ''){    //empty string after writing something not init
            this.setState({ 
                emailValue: email,
                emailError: 'empty'
            });
        }
        else if(!this.validateEmail(email)){   // user does have proper email
            this.setState({ 
                emailValue: email,
                emailError: 'notProperEmail'
            });
        }
        else{   //no error
            this.setState({ 
                emailValue: email,
                emailError: ''
            });
        }
    }

    emailHelpMessage(){
        if(this.state.emailError == 'empty'){return <p>Need to enter something</p>;}
        else if(this.state.emailError == 'notProperEmail'){return <p>Not a proper email address.</p>;}
        else{return null;}
    }

    /* --------------------------------------------------------------------------- */
    
    render() {
        return (
            <form>
                <Row className="show-grid">
                    <Col md={6}>
                        {/* First Name*/}
                        <FormGroup controlId="formBasicText" validationState={this.firstNameGetValidationState()}>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl type="text" value={this.state.firstNameValue} placeholder="Enter text" onChange={this.firstNameHandleChange.bind(this)}/>
                            <FormControl.Feedback/>
                            <HelpBlock> {this.firstNameHelpMessage()}</HelpBlock>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        {/* Last Name*/}
                        <FormGroup controlId="formBasicText" validationState={this.lastNameGetValidationState()}>
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl type="text" value={this.state.lastNameValue} placeholder="Enter text" onChange={this.lastNameHandleChange.bind(this)}/>
                            <FormControl.Feedback/>
                            <HelpBlock> {this.lastNameHelpMessage()}</HelpBlock>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col md={6}> 
                        {/* Email*/}
                        <FormGroup controlId="formBasicText" validationState={this.emailGetValidationState()}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" value={this.state.emailValue} placeholder="Enter text" onChange={this.emailHandleChange.bind(this)}/>
                            <FormControl.Feedback/>
                            <HelpBlock> {this.emailHelpMessage()}</HelpBlock>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        {/* Phone number */}
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Phone number</ControlLabel>
                            <FormControl type="text" placeholder="Enter text"/>
                        </FormGroup>
                    </Col>
                </Row>

                {/* Text Area */}
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>My Message</ControlLabel>
                    <FormControl componentClass="textarea" rows="4" placeholder="Message" />
                </FormGroup>
                <Button style = {{marginBottom: "5%"}} bsStyle="primary" bsSize="large" block>Submit</Button>                 
            </form>
        );
    }
}

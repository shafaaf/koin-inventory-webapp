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
            firstNameValue: '',
            firstNameError: 'init',
        };
    }

    getValidationState(){
        var firstNameError = this.state.firstNameError;
        if (firstNameError == '') {return 'success';}   //no error - success
        else if(firstNameError == 'init') {return 'warning';}   //initial state - warning
        else {return 'error';}  //error
    }

    handleChangeFirstName(e) {  //after entering something, will detect changes
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

    render() {
        return (
            <form>
                <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text" value={this.state.firstNameValue} placeholder="Enter text" onChange={this.handleChangeFirstName.bind(this)}/>
                    <FormControl.Feedback/>
                    <HelpBlock> {this.firstNameHelpMessage()}</HelpBlock>
                </FormGroup>
            </form>
        );
    }
}

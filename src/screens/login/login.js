import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

// Importing components
import FacebookButton from './components/facebookButton';
import ModalPopup from './components/modal.js';

// Importing CSS files
import './login.css';

console.log("Running login.js right now.");

export default class Login extends Component {
	
    showLoading(){
        console.log("Show loading here.");
    }
    
    render() {
    	return(
    		<div className = "container">
    			<img id = "koinLogo"  src = {require('./images/logo2.svg')}  alt="Image here"/>
				<Grid id = "socialButtonsGrid">
					<Row className="show-grid">
						<Col md={6} mdPush={6} style = {{ textAlign: 'center'}}><FacebookButton onClick = {this.showLoading()} onChangeLoginStatus = {this.props.onChangeLoginStatus}/></Col>
						<Col md={6} mdPull={6} style = {{ textAlign: 'center'}}><FacebookButton onChangeLoginStatus = {this.props.onChangeLoginStatus}/></Col>
    				</Row>
    			</Grid>
    		</div>
    	)
	}
}

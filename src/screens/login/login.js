import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6 
import { Grid, Row, Col } from 'react-bootstrap';

import FacebookButton from './components/facebookButton';
import ModalPopup from './components/modal.js';
import './login.css';

export default class Login extends Component {    
    render() {
    	console.log("Rendering login.js");
        return(
    		<div className = "container">
    			<img id = "koinLogo"  src = {require('./images/logo2.svg')}  alt="Image here"/>
				<Grid id = "socialButtonsGrid">
					<Row className="show-grid">
						<Col md={6} mdPush={6} style = {{ textAlign: 'center'}}><FacebookButton onChangeLoginStatus = {this.props.onChangeLoginStatus}/></Col>
						<Col md={6} mdPull={6} style = {{ textAlign: 'center'}}><FacebookButton onChangeLoginStatus = {this.props.onChangeLoginStatus}/></Col>
    				</Row>
    			</Grid>
    		</div>
    	)
	}
}

Login.propTypes = {
    onChangeLoginStatus: PropTypes.func.isRequired
}

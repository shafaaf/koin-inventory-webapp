import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import FacebookButton from './facebookButton';

import { Grid, Row, Col } from 'react-bootstrap';

import './login.css';

console.log("Running login.js right now.");

export default class Login extends Component {
	render() {
    	return(
    		<div className = "container">
    			<img id = "koinLogo"  src = {require('./logo2.svg')}  alt="Image here"/>
				<Grid>
					<Row className="show-grid">
						<Col md={6} mdPush={6} style = {{ textAlign: 'center'}}><FacebookButton onChangeLoginStatus = {this.props.onChangeLoginStatus}/></Col>
						<Col md={6} mdPull={6} style = {{ textAlign: 'center'}}><FacebookButton onChangeLoginStatus = {this.props.onChangeLoginStatus}/></Col>
    				</Row>
    			</Grid>
    		</div>
    	)
	}
}

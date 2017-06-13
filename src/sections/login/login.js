import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import FacebookButton from './facebookButton';

console.log("Running login.js right now.");


export default class Login extends Component {
	render() {
    	return(
    		<div className = "container">
    			<h1>Login Page</h1>
    			<FacebookButton onChangeLoginStatus = {this.props.onChangeLoginStatus}/>
    		</div>
    	)
	}
}

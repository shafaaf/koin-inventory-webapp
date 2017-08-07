/* 
This component rendered when going to a link 
which is not registered.
*/

import React,{Component} from 'react';
import {Button} from 'react-bootstrap';


export default class NoPageFound extends Component {

	render() {
		return (
			<div style = {{textAlign: "center"}}>
				<h1>No page found at this url!</h1>
				<Button href="/login" bsSize="large">Go back to home page</Button>
			</div>
		);
	}

}

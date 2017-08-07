/* 
	This component rendered when going to a link 
	which is not registered.
*/

import React,{Component} from 'react';
import {Button} from 'react-bootstrap';

const NoPageFound = () =>
    <div style = {{textAlign: "center"}}>
		<h1>No page found at this url!</h1>
		<Button href="/login" bsSize="large">Go back to home page</Button>
	</div>

export default NoPageFound;

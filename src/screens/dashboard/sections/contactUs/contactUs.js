import React,{Component} from 'react';

// Importing other sections
import MyForm from './components/myForm';

export default class ContactUs extends Component {
	
	render() {
		return (
			<div>
				<h2>Contact Us!</h2>
				<p> Have any questions? You can send an email here: &nbsp;info@sendkoin.com</p>
				<br/>
				<p> Or you can fill out the form below.</p>
				<MyForm/>
			</div>
		);
	}
}

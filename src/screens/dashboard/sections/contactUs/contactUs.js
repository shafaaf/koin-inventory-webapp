import React,{Component} from 'react';

// Importing other sections
import MyForm from './components/myForm';

export default class ContactUs extends Component {

	emailConactUs(){
		console.log("emailConactUs called.");
		window.open('mailto:shafaaf.hossain@hotmail.com');
	}
	
	render() {
		return (
			<div>
				<h2>Contact Us!</h2>
				<p> You can send email using button here: &nbsp; shafaaf.hossain@gmail.com </p>
				<br/>
				<p> Or fill out the form below.</p>
				<MyForm/>
			</div>
		);
	}
}
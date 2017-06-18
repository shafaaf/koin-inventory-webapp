import React,{Component} from 'react';

// Importing other sections
import Form from './components/form';

export default class ContactUs extends Component {

	emailConactUs(){
		console.log("emailConactUs called.");
		window.open('mailto:shafaaf.hossain@hotmail.com');
	}

	render() {
		return (
			<div>
				<h2>Contact Us!</h2>
				<button onClick = {this.emailConactUs}>Click here</button>
				<br/>
				<br/>
				<div>
					<Form/>
				</div>
			</div>
		);
	}
}
import React,{Component} from 'react';

// Importing other sections
import MyForm from './components/myForm';

import { Table } from 'reactable';


export default class ContactUs extends Component {

	emailConactUs(){
		console.log("emailConactUs called.");
		window.open('mailto:shafaaf.hossain@hotmail.com');
	}

	render() {
		return (
			<div>
				<h2>Contact Us!</h2>
				<Table className="table" data={[
					{ Name: 'Griffin Smith', Age: 18 },
					{ Age: 23,  Name: 'Lee Salminen' },
					{ Age: 28, Position: 'Developer' },
				]}/>

				<p> You can send email using button here: &nbsp;&nbsp; 
					<button onClick = {this.emailConactUs}>Click here</button>
				</p>
				<p> Or fill out the form below.</p>
				<br/>
				<MyForm/>
			</div>
		);
	}
}
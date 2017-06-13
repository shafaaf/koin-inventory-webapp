import React,{Component} from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

export default class Profile extends Component {

	facebookLogout(){
		// 1. Remove koinToken from storage
		// 2. Change state to null to render again
		console.log("facebook logout called");
		localStorage.removeItem("koinToken");
		this.props.onChangeLoginStatus(null);
	}

	render() {
		return (
			<div className = "container">
				<h1>Profile Page</h1>
				<Button onClick={this.facebookLogout.bind(this)} bsSize="small" bsStyle="danger">Log outz</Button>
			</div>
		);
	}
}

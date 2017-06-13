import React,{Component} from 'react';

export default class Profile extends Component {

	facebookLogout(){
		console.log("facebook logout called");
		localStorage.removeItem("koinToken");
		window.location = '/';
	}

	render() {
		return (
			<div>
				<h1>Profile Page</h1>
				<button onClick={this.facebookLogout}>Log out</button>
			</div>
		);
	}
}

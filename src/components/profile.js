import React,{Component} from 'react';

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
			<div>
				<h1>Profile Page</h1>
				<button onClick={this.facebookLogout.bind(this)}>Log out</button>
			</div>
		);
	}
}

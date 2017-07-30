import React,{Component} from 'react';

export default class Profile extends Component {
  	render() {
	  	console.log("profile.js: facebookAccessToken is: ", this.props.facebookAccessToken);
	    return (
	    	<div>
				<h2>My Profile</h2>
			</div>
	    );
	}
}

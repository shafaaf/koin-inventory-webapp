import React,{Component} from 'react';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.name = null;
		this.email = null;
		this.picture = null;
		this.state = {
			loading: true
		};	
	}

	componentDidMount() {
  		var facebookAccessToken = localStorage.getItem("facebookAccessToken");
  		console.log("profile.js: facebookAccessToken is: ", facebookAccessToken);
  		var url = 'https://graph.facebook.com/me?fields=name,email,picture.type(large)&access_token=' + facebookAccessToken;
		var request = new Request(url, {
			method: 'GET',
			mode: 'cors',
		});
		var that = this; // To keep track of this context within promise callback
		fetch(request).
			then(function(response) {
		        if (response.status !== 200) {   
		          console.log('Looks like there was a problem. Status Code: ' +  response.status);  
		          return;  
		        }
	        	// Examine the text in the response from Koin server
	        	response.json().then(function(data) {  
	          		console.log("data from server is: ", data);
	          		that.name = data["name"];
					that.email = data["email"];
					that.picture = data["picture"];
					that.setState({
						loading: false
					});
	          	});
	        })
	        .catch(function(err) {
				console.log("getInfo: err is: ", err);
			})
  	}

	loadProfile(){
		if(this.state.loading){ // Show loading screen when getting data
      		return <h3>Loading your profile ...</h3>;
    	}
    	else
    	{
    		return (
    			<div style = {{textAlign: "center"}}>
    				<p>{this.name}</p>
	    			<p>{this.email}</p>
	    			<img src = {this.picture["data"]["url"]}/>
    			</div>
    		);
    	}
	}  	

  	render() {
	  	return (
	    	<div>
				<h2>My Profile</h2>
				{this.loadProfile()}
			</div>
	    );
	}
}

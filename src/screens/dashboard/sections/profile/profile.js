import React,{Component} from 'react';
import { getMerchantInfo, getFacebookInfo} from './apiCalls.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.name = null;
		this.email = null;
		this.picture = null;

		this.store_name = null;
		this.store_location = null;
		this.store_type = null;
		
		this.state = {
			loading: true
		};	
	}


	// Todo: this access token may expire before koin server token
	componentDidMount() {
	    var fetchPromises = [getMerchantInfo(), getFacebookInfo()];
	    var that = this;
		Promise.all(fetchPromises)	// Todo: Fix possibility of case where category created but upload failed
		.then(function (result) {
			console.log("Promise.all: result is: ", result);
			var merchantInfo = result[0];
			var facebookInfo = result[1];
			that.store_name = merchantInfo["store_name"];
			that.store_location = merchantInfo["store_location"];
			that.store_type = merchantInfo["store_type"];

			that.name = facebookInfo["name"];
			that.email = facebookInfo["email"];
			that.picture = facebookInfo["picture"];

			that.setState({
				loading: false
			});
		})
		.catch(function(err) {	// Catch errors due to uploading picture or creating category 
	  		console.log("Promise.all: error: ", err);
		});
  	}

	loadProfile(){
		if(this.state.loading){ // Show loading screen when getting data
      		return <h3>Loading your profile ...</h3>;
    	}
    	else
    	{
    		return (
    			<div style = {{marginTop: "3%"}}>
    				<h3>Basic Info</h3>
    				<div style = {{paddingBottom: "1%"}}>
	    				<p>{this.name}</p>
		    			<p>{this.email}</p>
		    			<img src = {this.picture["data"]["url"]}/>
	    			</div>
	    			<div>
	    				<h3>Store Info</h3>
						<p>{this.store_name}</p>
		    			<p>{this.store_location}</p>
						<p>{this.store_type}</p>
					</div>
    			</div>
    		);
    	}
	}  	

  	render() {
	  	return (  		
	  		<div>
		  		<h2>My Profile</h2>
		    	<div style = {{textAlign: "center"}}>
					{this.loadProfile()}
				</div>
			</div>
	    );
	}
}

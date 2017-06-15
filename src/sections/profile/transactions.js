import React,{Component} from 'react';

export default class Transactions extends Component {
  render() {
  	console.log("Rendering transactions.");
  	//Requesting transaction info from Koin server
	// Hard coded to get from Zen's token
	var data = JSON.stringify({});
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/transactions/merchant/list';
	var request = new Request(url, {
		method: 'POST',
		body: data,
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'
		})
	});
	var thisContext = this; // To keep track of this context within promise callback
	fetch(request).then(
		function(response) {
			if (response.status !== 200) {   
				console.log('Looks like there was a problem. Status Code: ' +  response.status);  
				return;  
			}
			// Examine the text in the response from Koin server
			response.json().then(function(data) {  
			console.log("data from server is: ", data);
			});
		}
	);
	console.log("After promise section.");

    return (
    	<div className = "container">
			<h2>Your Transactions!</h2>
			<p>Fell free to check out your transactions!</p>
		</div>
    );
  }
}

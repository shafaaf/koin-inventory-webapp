import React,{Component} from 'react';

export default class Transactions extends Component {
  constructor(props){
  	super(props);
  	 this.state = {
      transactions: {}
    };
  }

  componentWillMount(){
  	console.log("componentWillMount here.");
  	//heard not good
  }
  
  componentDidMount(){	// Fetch merchant's transactions
  	console.log("componentDidMount here. Going to fetch transactions");
  	//Requesting transaction info from Koin server
	// Todo: Hard coded right now using Zen's session token
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
				console.log("transaction data from server is: ", data);
				console.log("setting state for transactions now.");
				thisContext.setState({ transactions: data });
			});
		}
	);
	console.log("After promise section in transactions fetch.");

  }

  render() {
  	console.log("Rendering transactions component.");
    return (
    	<div className = "container">
			<h2>Your Transactions!</h2>
			<p>Fell free to check out your transactions!</p>
		</div>
    );
  }
}

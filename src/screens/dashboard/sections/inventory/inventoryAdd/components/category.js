import React,{Component} from 'react';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, FormControl, FormGroup} from 'react-bootstrap';


export default class Category extends Component {
 	constructor(props) {
    	super(props);
		this.state = {
      		loading: true,
      		dropDownTitle: "Select Category",
      		newCategorySelected: false
		};
	}

	componentDidMount() {
		console.log("category - componentDidMount() method called. Fetching category list");
		
		var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/merchant';
		var request = new Request(url, {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
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
	          		console.log("componentDidMount: category data from server is: ", data);
	          	});
	        }
	   );
	}

	processCategoryInput(category){
		console.log("processCategoryInput- category is: ", category);
		if(category == "New Category"){
			this.setState({
      			dropDownTitle: category,
      			newCategorySelected: true
    		});
		}
		else{
			console.log("processCategoryInput: at else");
			this.setState({
      			dropDownTitle: category,
      			newCategorySelected: false
    		});
		}
	}

	renderCategoryInputField(){
		if(this.state.newCategorySelected){
			return (
				<FormGroup controlId="formBasicText" style = {{marginTop: "3%"}}>
				<FormControl type="text" placeholder="Enter new category"/>
				<FormControl.Feedback/>
				</FormGroup>
			);
		}
	}

	renderCategorySelection(){
		if(this.state.loading){
			return <h3>Loading previous categories ...</h3>;
		}
		else{
			return (
				<div>
					<DropdownButton title = {this.state.dropDownTitle} id="dropdown-size-medium" 
						onSelect={(category)=>this.processCategoryInput(category)}>
						<MenuItem eventKey="New Category">New Category</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey="Action">Action</MenuItem>
						<MenuItem eventKey="Another action">Another action</MenuItem>
						<MenuItem eventKey="Active Item">Active Item</MenuItem>
					</DropdownButton>
					{this.renderCategoryInputField()}
				</div>
			);
		}
	}

 	render() {
 		console.log("category: render mehthod called.");
    	return (
	    	<div>
				{this.renderCategorySelection()}
			</div>
    	);
  	}

}

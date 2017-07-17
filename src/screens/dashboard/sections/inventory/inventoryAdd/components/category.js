import React,{Component} from 'react';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, FormControl, FormGroup} from 'react-bootstrap';


export default class Category extends Component {
 	constructor(props) {
    	super(props);
		this.state = {
      		loading: true,
      		categoryList : [], 
      		dropDownTitle: "Select Category",
      		newCategorySelected: false
		};
	}

	// Fetching list of categories already submitted
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
	          		console.log("server category list is: ", data["categories"]);
	          		var categoryList = thisContext.state.categoryList;
	          		categoryList.splice(0,categoryList.length);

	          		// Filling in category list
	          		var i;
	          		var categoryListLength = data["categories"].length;
	          		for(i = 0; i<categoryListLength;i++){
	          			categoryList.push(data["categories"][i]["category_name"]);
	          		}
	          		console.log("categoryList is: ", categoryList);
	          		thisContext.setState({
	      				categoryList: categoryList,
	      				loading: false
    				});
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
    		}, this.props.setCategory(null));
		}
		else {
			console.log("processCategoryInput: at else");
			this.setState({
      			dropDownTitle: category,
      			newCategorySelected: false
    		}, this.props.setCategory(category));
		}
	}

	categoryHandleChange(event){
		console.log("categoryHandleChange called. event is: ", event);
		this.props.setCategory(event.target.value);
	}

	renderCategoryInputField(){
		if(this.state.newCategorySelected){
			return (
				<FormGroup controlId="formBasicText" style = {{marginTop: "3%"}}>
				<FormControl type="text" placeholder="Enter new category" onChange={this.categoryHandleChange.bind(this)}/>
				<FormControl.Feedback/>
				</FormGroup>
			);
		}
	}

	renderCategorySelection(){
		if(this.state.loading){
			return <p>Loading previous categories ...</p>;
		}
		else{

			var menuItems = [];
			menuItems.push(<MenuItem key = "New Category" eventKey="New Category">New Category</MenuItem>);
			menuItems.push(<MenuItem key = "divider" divider />);
			// console.log("menuItems is: ", menuItems);

			var categoryList = this.state.categoryList;
			var categoryItems = categoryList.map((category, index) =>
  				<MenuItem key = {index} eventKey={category}>{category}</MenuItem>
  			);
  			console.log("categoryItems is: ", categoryItems);
  			menuItems = menuItems.concat(categoryItems);
  			console.log("menuItems is: ", menuItems);

			return (
				<div>
					<DropdownButton title = {this.state.dropDownTitle} id="dropdown-size-medium" 
						onSelect={(category)=>this.processCategoryInput(category)}>
							{menuItems}
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

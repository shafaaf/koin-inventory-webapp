import React,{Component} from 'react';
import {Grid, Row, Col, Button, DropdownButton, MenuItem, FormControl, FormGroup} from 'react-bootstrap';

import {createNewCategory} from '../../requests.js';

export default class Category extends Component {
 	constructor(props) {
    	super(props);
		this.state = {
      		loading: true,
      		categoryList : [],	// Always updated list of categories
      		dropDownTitle: "Select Category",
      		newCategorySelected: false	// Decides whether to show input box for new category
		};
	}

	// Fetching intiial list of categories already submitted before
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
	          		console.log("componentDidMount: raw data from server is: ", data);
	          		// console.log("server category list is: ", data["categories"]);
	          		var categoryList = thisContext.state.categoryList;
	          		categoryList.splice(0,categoryList.length);

	          		// Filling in category list
	          		var i;
	          		var categoryListLength = data["categories"].length;
	          		for(i = 0; i<categoryListLength;i++){
	          			categoryList.push(data["categories"][i]["category_name"]);
	          		}
	          		// console.log("categoryList is: ", categoryList);
	          		thisContext.setState({
	      				categoryList: categoryList,
	      				loading: false
    				});
	          	});
	        }
	   );
	}

	// After submission of an item, update the dropdown if new item
	componentWillReceiveProps(newProps){
		console.log("category: componentWillReceiveProps called.");
		console.log("category: newProps is: ", newProps);
		console.log("category: oldProps is: ", this.props);

		if(newProps.newCategoryForDropdown != this.props.newCategoryForDropdown){//different item selected than previous submission
			var categoryList = this.state.categoryList;
			var i;
			var categoryListLength = categoryList.length;
			var flag = 0;
			for(i=0; i<categoryListLength; i++){
				if(categoryList[i] == newProps.newCategoryForDropdown){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				categoryList.push(newProps.newCategoryForDropdown);
				this.setState({
					categoryList: categoryList
				});	
			}
		}
	}

	processCategoryInput(category){
		// console.log("processCategoryInput- category is: ", category);
		if(category == "New Category"){
			this.setState({
      			dropDownTitle: category,
      			newCategorySelected: true
    		}, this.props.setCategory(null));
		}
		else {
			// console.log("processCategoryInput: at else");
			this.setState({
      			dropDownTitle: category,
      			newCategorySelected: false
    		}, this.props.setCategory(category));
		}
	}

	categoryHandleChange(event){
		// console.log("categoryHandleChange called. event is: ", event);
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
  			// console.log("categoryItems is: ", categoryItems);
  			menuItems = menuItems.concat(categoryItems);
  			// console.log("menuItems is: ", menuItems);

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
 		console.log("category: render method called.");
    	return (
	    	<div>
				{this.renderCategorySelection()}
			</div>
    	);
  	}

}
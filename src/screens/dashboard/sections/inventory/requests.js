// Creating a new category
export function createNewCategory(thisContext) {
	console.log("createNewCategory called");
	
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/merchant';	
	var request = new Request(url, {
		method: 'GET',
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
		})
	});
	
	// var thisContext = this; // To keep track of this context within promise callback

	fetch(request).then(
		function(response) {
			if (response.status !== 200) {   
				console.log('Looks like there was a problem. Status Code: ' +  response.status);  
				return;  
			}
			// Examine the text in the response from Koin server
			response.json().then(function(data) {  
				console.log("createNewCategory: raw data from server is: ", data);
				// console.log("server category list is: ", data["categories"]);
				// var categoryList = thisContext.state.categoryList;
				// categoryList.splice(0,categoryList.length);

				// // Filling in category list
				// var i;
				// var categoryListLength = data["categories"].length;
				// for(i = 0; i<categoryListLength;i++){
				// 	categoryList.push(data["categories"][i]["category_name"]);
				// }
				// console.log("categoryList is: ", categoryList);
				// thisContext.setState({
				// 	categoryList: categoryList,
				// 	loading: false
				// });
			});
		}
	);
}

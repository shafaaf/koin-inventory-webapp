import request from 'superagent';

// Configuration for Cloudinary
const CLOUDINARY_UPLOAD_PRESET = 'ydrh63nt';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sendkoin/upload';

export function test() {
	console.log("Testing");
	return;
}

// Upload image somewhere like S3, Cloudinary etc
export function handleImageUpload(file){
	return new Promise((resolve, reject) => {
		console.log("At handleImageUpload. Will upload now- file is: ", file);
		if(file == null){	// If no picture uploaded, set url to null
			resolve(null);
		}
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
		.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
		.field('file', file);
		upload.end((err, response) => {
			if (err) {
				console.error("handleImageUpload: err is: ", err);
				reject("uploadImageError");
			}
			if (response.body.secure_url !== '') {
				console.log("handleImageUpload: new uploadedImageCloudinaryUrl is:", response.body.secure_url);
				resolve(response.body.secure_url);
			}
		});
	})	
}

export function createCategory (category, that){
	return new Promise((resolve, reject)=> {
		console.log("At createCategory. category is: ", category);
		var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category';
		var body = JSON.stringify({
			"category_name": category
		});
		var request = new Request(url, {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: body
		});
		console.log("Sending first request to make the category if doesnt exist.");

		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {
			    	console.log('createCategory: Looks like there was a problem at category create. Status Code: ' +  response.status);
			    	reject("createCategoryError");	// Give proper error messgae
			    }
			    else
			    {	
			    	response.json().then(function(data) {
			    		console.log("createCategory: data from server is: ", data);
			    		var categoryId = data["category"]["category_id"];
						// console.log("createCategory: categoryId is: ", categoryId);
						resolve(categoryId);			    		
			    	});
			    }
			})
			.catch(function (error){
    			console.log('createCategory: error in creating category: ', error);
    			reject(error);
  			})
	});
}

export function createItem (categoryId, that){
	return new Promise((resolve, reject)=> {
		console.log("At createItem. categoryId is: ", categoryId);
		var url = "http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/" + categoryId + "/items"
		var inventoryData = [];
  		var inventoryItem = {};
  		inventoryItem["name"] = that.state.productName;
		inventoryItem["price"] = that.state.price;
  		inventoryItem["description"] = that.state.description;
  		console.log("that.state.uploadedImageUrl is: ", that.state.uploadedImageUrl);
  		inventoryItem["image_url"] = that.state.uploadedImageUrl;

  		inventoryData.push(inventoryItem);
	    var body = JSON.stringify({
			"inventory_items": inventoryData
		});

		var request = new Request(url, {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: body
		});
		console.log("Sending second request to make the inventory item.");

		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {
			    	console.log('createItem: Looks like there was a problem at item create. Status Code: ' +  response.status);
			    	reject("createItemError");	// Give proper error messgae
			    }
			    else
			    {	
			    	response.json().then(function(data) {
			    		console.log("createItem: data from server is: ", data);
			    		resolve(data);		    		
			    	});
			    }
			})
			.catch(function (error){
    			console.log('createItem: error in creating item: ', error);
    			reject(error);
  			})
	});
}

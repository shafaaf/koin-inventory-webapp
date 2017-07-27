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
		console.log("At handleImageUpload: file is: ", file);
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
		.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
		.field('file', file);
		upload.end((err, response) => {
			if (err) {
				console.error("handleImageUpload: err is: ", err);
				reject(err);
			}
			if (response.body.secure_url !== '') {
				// console.log("handleImageUpload: new uploadedImageCloudinaryUrl is:", response.body.secure_url);
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

		fetch(request).then(
			function(response) {
				if (response.status !== 200) {
			    	console.log('Looks like there was a problem at category create. Status Code: ' +  response.status);
			    	reject(response.status);	// Give proper error messgae
			    }
			    else
			    {	
			    	response.json().then(function(data) {
			    		console.log("createCategory: data from server is: ", data);
			    		console.log("createCategory: that is: ", that);
			    		var categoryId = data["category"]["category_id"];
						// console.log("createCategory: categoryId is: ", categoryId);
						resolve(categoryId);			    		
			    	});
			    }
			}
		);
	});
}

export function createItem (categoryId){
	console.log("At createItem, categoryId is: ", categoryId);
}

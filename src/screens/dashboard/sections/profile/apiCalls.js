export function getMerchantInfo (){
	return new Promise((resolve, reject)=> {
		console.log("At getMerchantInfo");
		var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/merchant';
		var request = new Request(url, {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			})
		});
		console.log("Sending request to get merchant info");
		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {
			    	console.log('getMerchantInfo: Looks like there was a problem at getMerchantInfo. Status Code: ' +  response.status);
			    	reject(response);
			    }
			    else
			    {	
			    	response.json().then(function(data) {
			    		console.log("getMerchantInfo: data from server is: ", data);
						resolve(data);			    		
			    	});
			    }
			})
			.catch(function (error){
    			console.log('getMerchantInfo: error: ', error);
    			reject(error);
  			})
	});
}

export function getFacebookInfo (){
	return new Promise((resolve, reject)=> {
		console.log("At getFacebookInfo");
		var facebookToken = localStorage.getItem("facebookAccessToken");
  		console.log("facebookToken is: ", facebookToken);
		var accessToken = JSON.parse(facebookToken);
		accessToken = accessToken["accessToken"];
  		console.log("profile.js: facebook AccessToken is: ", accessToken);
  		var url = 'https://graph.facebook.com/me?fields=name,email,picture.type(large)&access_token=' + accessToken;
		var request = new Request(url, {
			method: 'GET',
			mode: 'cors',
		});
		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {
			    	console.log('getFacebookInfo: Looks like there was a problem at getFacebookInfo. Status Code: ' +  response.status);
			    	reject(response);
			    }
			    else
			    {	
			    	response.json().then(function(data) {
			    		console.log("getFacebookInfo: data from server is: ", data);
						resolve(data);			    		
			    	});
			    }
			})
			.catch(function (error){
    			console.log('getFacebookInfo: error: ', error);
    			reject(error);
  			})
	});
}



export function onAfterSaveCell(row, cellName, cellValue) {
}

// Allow edits in table row
export function onBeforeSaveCell(row, cellName, cellValue) {
	console.log("At onBeforeSaveCell. ");
	console.log("row is: ", row);

	// Update item atttributes in database
	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/items/' + row["inventory_item_id"];
		
	// Note: Doing all this since, need old values also as updates only with whatever passed in.
	// Other values get deleted.
	var name = row["name"];
	var price = row["price"];
	var description = row["description"];
	var imageUrl = row["image_url"];
	
	if(cellName == "name"){name = cellValue;}
	else if (cellName == "price"){price = cellValue;}
	else if(cellName == "description"){description = cellValue;}
	else if(cellName == "image_url"){imageUrl = cellValue;}
	else{console.log("onBeforeSaveCell: ERROR now.");}
	var inventoryItemDetails = {
		"name": name,
		"price": price,
		"description": description,
		"image_url": imageUrl
	};
	console.log("onBeforeSaveCell: inventoryItemDetails is: ", inventoryItemDetails);
	var body = JSON.stringify({
		"inventory_item": inventoryItemDetails
	});
	var request = new Request(url, {
		method: 'PUT',
		mode: 'cors',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
		}),
		body: body
	});
	var thisContext = this;
	console.log("onBeforeSaveCell: Sending request to update inventory item.");					
	fetch(request)
		.then(function(response) {
			if (response.status !== 200) {   
				console.log('onBeforeSaveCell: Looks like there was a problem. Status Code: ' +  response.status); 
				alert("onBeforeSaveCell: Some error saving data. Try again later. Status Code: ", response.status);
				return;
			}
			// Get response from Koin server and update table data to reflect change in client view
			response.json().then(function(data) {
				console.log("onBeforeSaveCell: data from server is: ", data);
				
				// Update tablesData state to reload new row values onto client side.
				var tablesData = thisContext.state.tablesData;
				console.log("onBeforeSaveCell: tablesData is: ", tablesData);
				// console.log("onBeforeSaveCell: current value is: ", tablesData["Popular Items"][0]["name"]);
				
				var i;
				var catgeory = row["category_name"];
				for(i = 0;i<tablesData[catgeory].length; i++){
					if(tablesData[catgeory][i]["inventory_item_id"] == data["inventory_item"]["inventory_item_id"]){
						console.log("onBeforeSaveCell: Item updated is: ", tablesData[catgeory][i]);
						tablesData[catgeory][i]["name"] = data["inventory_item"]["name"];
						tablesData[catgeory][i]["price"] = data["inventory_item"]["price"];
						tablesData[catgeory][i]["description"] = data["inventory_item"]["description"];
						tablesData[catgeory][i]["image_url"] = data["inventory_item"]["image_url"];
						break;
					}
				}
				console.log("onBeforeSaveCell: Setting state for tablesData.");
				thisContext.setState({
					tablesData: tablesData
				});
			});
		})
		.catch(function(err) {
			console.log("onBeforeSaveCell: err is: ", err);
		})
	console.log("onBeforeSaveCell: Afer fetch just before return.");
	return false;
}

//-------------------------------------------------------------------------------------------------------------------

// Editing category names
export function categoryNameChanged(oldCategory, newCategory) {
	console.log("======on categoryNameChanged");
}

// Called when editing category names
// Todo: Fix case where getting called twice
export function validateCategoryEdit(oldCategory, newCategory){
	console.log("validateCategoryEdit- oldCategory is: ", oldCategory);
	console.log("validateCategoryEdit- newCategory is: ", newCategory);
	if(oldCategory == newCategory){	// No change in value
		return false;
	}
	if((newCategory == null) || (newCategory == "") 
		|| (newCategory == undefined)){	// If put in nothing as category name
		alert("Not a proper category value.");
		return false;
	}
	// Getting old category table
 	var tablesData = this.state.tablesData;
 	console.log("current tablesData is: ", tablesData);
 	console.log("current value is: ", tablesData[oldCategory]);
 	
 	if(!(oldCategory in tablesData)){	//Todo: Hack - when called second time, the old category would be gone from tablesData
 		console.log(oldCategory, "is not found in tablesData so probably second time called bug so return.");
 		return false;
 	}

 	// Getting categoryId of the category that is selected
 	var categoryNameToId = this.state.categoryNameToId;
 	var categoryId = categoryNameToId[oldCategory];
 	console.log("categoryNameToId is: ", categoryNameToId);
 	console.log("categoryId selected is: ", categoryId);
	
	// Send to server to update category name
 	var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/' + categoryId;
    var data = JSON.stringify({
    	"category_name": newCategory
    });
    var request = new Request(url, {
      method: 'PUT',
      body: data,
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
      })
    });
    var thisContext = this; // To keep track of this context within promise callback
    fetch(request)
	    .then(function(response) {
	        if (response.status !== 200) {   
	          console.log('Looks like there was a problem. Status Code: ' +  response.status);  
	          return;  
	        }
	        // Update local state.
	        console.log("validateCategoryEdit: response is: ", response);
		    response.json().then(function(data) {  
		        console.log("validateCategoryEdit: data from server is: ", data);
		        
		        // Todo: Hack - when called second time, the old category would be gone from tablesData
		        if(!(oldCategory in tablesData)){	
		     		console.log(oldCategory, "is not found in tablesData so probably second time called bug so return.");
		     		return false;
		     	}
		     	var oldCategoryTable = tablesData[oldCategory];
		        var i;
				for(i=0; i<oldCategoryTable.length; i++){	// Replace old categoryName for all the items
					oldCategoryTable[i]["category_name"] = newCategory;
				}
				tablesData[newCategory] = tablesData[oldCategory]; // Making the new category table and deleting old one
		     	delete tablesData[oldCategory];
		     	console.log("new tablesData is: ", tablesData);

		     	// Change tablesCategoryOrder to maintain ordering when rendering table
		     	var tablesCategoryOrder = thisContext.state.tablesCategoryOrder;
		     	console.log("current tablesCategoryOrder is: ", tablesCategoryOrder);
		     	for(i=0; i<tablesCategoryOrder.length; i++){
		     		if(tablesCategoryOrder[i] == oldCategory){
		     			tablesCategoryOrder[i] = newCategory;
		     			break;
		     		}
		     	}
				
				// Adding in new categoryName in categoryNameToId
				categoryNameToId[newCategory] = categoryNameToId[oldCategory]; // Making the new category name entry in the dict
		     	delete categoryNameToId[oldCategory];
		     	console.log("new categoryNameToId is: ", categoryNameToId);

		     	console.log("new tablesCategoryOrder is: ", tablesCategoryOrder);
		     	thisContext.itemsToDelete = {};	// Remove items selected already for delete
		     	thisContext.setState({
					tablesData: tablesData,
					tablesCategoryOrder: tablesCategoryOrder,
					categoryNameToId: categoryNameToId
				});
	        });
	    })
		.catch(function (error){
			console.log('validateCategoryEdit: error in editing category: ', error);
			})
	return false; // Updating local state done after sending to server using setState
}




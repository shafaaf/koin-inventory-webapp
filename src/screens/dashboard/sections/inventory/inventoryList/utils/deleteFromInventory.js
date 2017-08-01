
// Row selections helpers

export function onSelectAllRows(isSelected, rows) { // When selecting all rows to delete
	// console.log("onSelectAllRows: isSelected is: ", isSelected);
	console.log("onSelectAllRows: rows is: ", rows);	
	if(rows.length ==0){
		return;
	}
	var itemsToDelete = this.itemsToDelete;
	console.log("onSelectAllRows: itemsToDelete is: ", itemsToDelete);

	var categoryName = rows[0]["category_name"];	// Todo: better way? Rest should be the same
	var i;
	if(isSelected){	//Add items itemsToDelete
		for(i=0; i<rows.length; i++){
			var inventoryItemId = rows[i]["inventory_item_id"];
			if(categoryName in itemsToDelete){
				itemsToDelete[categoryName][inventoryItemId] = rows[i];
			}
			else{
				itemsToDelete[categoryName] = {};
				itemsToDelete[categoryName][inventoryItemId] = rows[i];
			}
		}
	}
	else{
		delete itemsToDelete[categoryName]; 
	}
	console.log("onSelectAllRows: itemsToDelete is: ", itemsToDelete);
}

// When selecting indivitual rows to delete
export function onRowSelect(row, isSelected, e) {
	// console.log("onRowSelect: row is: ", row);
	// console.log("onRowSelect: isSelected is: ", isSelected);
	// console.log("onRowSelect: e is: ", e);

	var itemsToDelete = this.itemsToDelete;
	console.log("itemsToDelete is: ", itemsToDelete);

	var inventoryItemId = row["inventory_item_id"];
	var categoryName = row["category_name"];

	if(isSelected){	// Add the row to delete to itemsToDelete 
		if(categoryName in itemsToDelete){
			itemsToDelete[categoryName][inventoryItemId] = row;
		}
		else{
			itemsToDelete[categoryName] = {};
			itemsToDelete[categoryName][inventoryItemId] = row;
		}
	}
	else{ // Remove the row from itemsToDelete
		delete itemsToDelete[categoryName][inventoryItemId];
	}
	console.log("onRowSelect: itemsToDelete is: ", itemsToDelete);
}

//-------------------------------------------------------------------------------------------------------
	// Delete items
	// Called when delete button for a table clicked on
	export function onDeleteButtonClick(category){
		console.log("onDeleteButtonClick called for category: ", category);
		var itemsToDelete = this.itemsToDelete;
		console.log("onDeleteButtonClick: itemsToDelete is: ", itemsToDelete);
		if(!(category in itemsToDelete)) {	// Todo: Still case of cateogry presnt with 0 items but handled as length would be 0
			console.log("No item selected for: ", category);
			return;
		}
		
		// Making promises for rows selected
		var categoryItemsToDelete = itemsToDelete[category];
		console.log("onDeleteButtonClick: categoryItemsToDelete is: ", categoryItemsToDelete);
		// var numberOfItemsToDelete = Object.keys(categoryItemsToDelete).length;
		// console.log("onDeleteButtonClick: numberOfItemsToDelete is: ", numberOfItemsToDelete);
		var deletePromises = [];
		var i;
		for(var itemId in categoryItemsToDelete){
			console.log("item is: ", categoryItemsToDelete[itemId]);
			var url = `http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/items/${itemId}`;
			var request = new Request(url, {
				method: 'DELETE',
				mode: 'cors',
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
				}),
				body: {}
			});
			deletePromises.push(fetch(request));
		}
		console.log("onDeleteButtonClick- deletePromises is: ", deletePromises);
		var tablesData = this.state.tablesData;
		console.log("onDeleteButtonClick- tablesData is: ", tablesData);
		var that = this;
		Promise.all(deletePromises)
			.then(function (result) {
				console.log("onDeleteButtonClick: result is: ", result);
				// Give error messages for the ones not able to delete. Some may delete, some not.
				/* Fetch promises only reject with a TypeError when a network error occurs. Since 4xx and 5xx responses aren't network errors, 
				there's nothing to catch. You'll need to throw an error yourself to use Promise#catch.*/
				
				// Handle local state. Remove the items which were successfully deleted
				var i, j;
				for(i=0; i<result.length; i++){
					if(result[i]["status"] != 200){	//Todo: Confirm what to check here
						console.log("onDeleteButtonClick: result: ", i, " was not sucessful.");
						continue;
					}
					console.log("onDeleteButtonClick: result: ", i, " was sucessful.");
					var parts = result[i]["url"].split('/');
					var itemId = parts.pop() || parts.pop();	// Todo: See if better way possible
					console.log("onDeleteButtonClick: itemId is: ", itemId);
					for(j = 0; j<tablesData[category].length; j++){
						if(tablesData[category][j]["inventory_item_id"] == itemId){
							tablesData[category].splice(j, 1);
							delete itemsToDelete[category][itemId];	// Item deleted so remove from tracker
						}
					}
				}
				console.log("onDeleteButtonClick: itemsToDelete is: ", itemsToDelete);
				that.setState({
					tablesData: tablesData
				});
			})
			.catch(function(err) {
				console.log("onDeleteButtonClick: err is: ", err);
			})
		return;
	}
	
//-------------------------------------------------------------------------------------------------------

	// Delete a whole category table.
	export function onDeleteCategory(category){
		console.log("onDeleteCategory called. category is: ", category);

      	var tablesCategoryOrder = this.state.tablesCategoryOrder;
		var tablesData = this.state.tablesData;
      	var categoryNameToId = this.state.categoryNameToId;
      	console.log("onDeleteCategory: categoryNameToId is: ", categoryNameToId);
      	var categoryId = categoryNameToId[category];
      	console.log(`onDeleteCategory: categoryId for ${category} is: ${categoryId}`);
      	
      	// Request to delete whole category table
      	var url = `http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/inventory/category/${categoryId}`;
		var request = new Request(url, {
			method: 'DELETE',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 6849c19749955194e6f51c5a69ac28b2aac08ade'  // Zen's token hardcoded in
			}),
			body: {}
		});
		
		var that = this;
		console.log("onDeleteCategory: Sending request to delete whole category table.");					
		fetch(request)
			.then(function(response) {
				if (response.status !== 200) {   
					console.log('onDeleteCategory: Looks like there was a problem. Status Code: ' +  response.status); 
					alert("onDeleteCategory: Some error deleteing category table. Status Code: ", response.status);
					return;
				}
				// Get response from Koin server and update table data to reflect change in client view
				response.json().then(function(data) {
					console.log("onDeleteCategory: data from server is: ", data);
					
					// Handle local state. Remove the items which were successfully deleted
					console.log("onDeleteCategory: tablesData is: ", tablesData);
					console.log("onDeleteCategory: tablesCategoryOrder is: ", tablesCategoryOrder);
					console.log("onDeleteCategory: categoryNameToId is: ", categoryNameToId);

					delete tablesData[category];
					delete categoryNameToId[category];
					var i;
					for(i=0; i<tablesCategoryOrder.length; i++){
						if(tablesCategoryOrder[i] == category){
							console.log("onDeleteCategory: category to delete on tablesCategoryOrder index: ", i);
							tablesCategoryOrder.splice(i, 1);
							break;
						}
					}
					that.setState({
						tablesData: tablesData,
						categoryNameToId: categoryNameToId,
						tablesCategoryOrder: tablesCategoryOrder
					});

				});
			})
			.catch(function(err) {
				console.log("onDeleteCategory: err is: ", err);
			})
	}
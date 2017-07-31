// Functions to format values in table
import React,{Component} from 'react';


// Data Formatters
export function imageFormatter(cell, row){
	// console.log("cell is: ", cell);
	// console.log("row is: ", row);
	if((cell == undefined) || (cell ==  "") || (cell == null)){	// Case when item added with no image
		return <p>Image not uploaded</p>
	}	
	return (<img onClick={()=>this.onImageClick(cell, row)} id = {cell} style={{width:200}} src={cell}/>)
}

//-------------------------------------------------------------------------------------------------------

// Row selections

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


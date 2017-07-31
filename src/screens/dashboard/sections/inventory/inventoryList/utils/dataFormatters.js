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

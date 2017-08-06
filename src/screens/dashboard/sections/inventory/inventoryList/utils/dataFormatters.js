// Functions to format values in table
import React,{Component} from 'react';

// Data Formatters
export function imageFormatter(cell, row){
	// console.log("cell is: ", cell);
	// console.log("row is: ", row);
	if((cell == undefined) || (cell ==  "") || (cell == null)){	// Case when item added with no image
		return <p onClick={()=>this.onImageClick(cell, row)}>Image not uploaded</p>
	}	
	return (<img onClick={()=>this.onImageClick(cell, row)} style={{width:'100%'}} src={cell}/>)
}

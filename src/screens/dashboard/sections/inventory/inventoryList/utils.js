// Functions to format values in table
import React,{Component} from 'react';

export function imageFormatter(cell, row){
	// return "<img src='"+cell+"'/>" ;
	return (<img style={{width:200}} src={cell}/>)
}

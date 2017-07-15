// Functions to format values in table
import React,{Component} from 'react';

export function priceFormatter(cell, row){
  return 'Tk ' + cell;
}

export function timeFormatter(cell, row){
  var moment = require('moment');
  var a = moment(cell);
  return <p>{a.format("MMM Do YYYY")}</p>;
}

export function milliEpochToString(milliEpoch){
	var moment = require('moment');
  	var a = moment(milliEpoch);
  	return a.format("MMM Do YYYY");
}
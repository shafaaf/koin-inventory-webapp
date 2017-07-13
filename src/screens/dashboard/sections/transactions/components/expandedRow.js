import React,{Component} from 'react';
import Moment from 'react-moment';
var moment = require('moment');

export default class ExpandedRow extends React.Component {
  	render() {
	    if (this.props.storeLocation && this.props.storeType) {
	    	var a = moment(this.props.exactTime);

	    	return (
	    		<div style = {{overflowX: "scroll"}}>
	    			<div> <p>Exact Time is: 0{this.props.exactTime}</p></div>
	    			<div> <p>Exact Time is: {a.format("MMMM Do YYYY, h:mm:ss a")}</p></div>
	    			<div> <p>Store Location is: {this.props.storeLocation}</p></div>
	      			<div> <p>Store Type is: {this.props.storeType}</p></div>
	      			<div> Store Name is: {this.props.storeName}</div>
	      		</div>
			);
		} 
		else {
			return (<p>What!? Some data missing.</p>);
		}
	}
}
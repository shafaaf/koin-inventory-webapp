import React,{Component} from 'react';
import Moment from 'react-moment';
var moment = require('moment');

export default class ExpandedRow extends React.Component {
  	render() {
	    if (this.props.storeLocation && this.props.storeType) {
	    	var a = moment(this.props.exactTime);
	    	return (
	    		<div style = {{overflowX: "scroll"}}>
	    			<div>Exact Time is: 0{this.props.exactTime}</div>
	    			<div>Exact Time String is: {a.format("MMMM Do YYYY, h:mm:ss a")}</div>
	    			<br/>
	    			<div> Store Name is: {this.props.storeName}</div>
					<div>Store Type is: {this.props.storeType}</div>
	    			<div>Store Location is: {this.props.storeLocation}</div>
	      		</div>
			);
		} 
		else {
			return (<p>What!? Some data missing.</p>);
		}
	}
}
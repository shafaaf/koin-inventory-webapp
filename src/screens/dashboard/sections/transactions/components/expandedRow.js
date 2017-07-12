import React,{Component} from 'react';

export default class ExpandedRow extends React.Component {
  	render() {
	    if (this.props.storeLocation && this.props.storeType) {
	    	return (
	    		<div style = {{overflowX: "scroll"}}>
	    			<div> <p>Exact Time is: {this.props.exactTime}</p></div>
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

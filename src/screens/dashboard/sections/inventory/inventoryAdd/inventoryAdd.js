import React,{Component} from 'react';

// Importing other components
//import Test from './components/test.js';
import UploadImages from './components/uploadImages.js';
import ItemInfo from './components/itemInfo.js';
import {Grid, Row, Col, Button} from 'react-bootstrap';

export default class InventoryAdd extends Component {
	render() {
		return (
			<div>
				<Grid>	
					<h2 style = {{textAlign: "center"}}>Item Information</h2>
					<ItemInfo style = {{textAlign: "center"}}/>
					<UploadImages style = {{textAlign: "center"}}/>
					<Button bsStyle="primary" bsSize="large" block>Submit</Button>
				</Grid>
			</div>
		);
	}
}

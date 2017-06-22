import React,{Component} from 'react';

// Importing other components
//import Test from './components/test.js';
import UploadImages from './components/uploadImages.js';
import ItemInfo from './components/itemInfo.js';
import {Grid, Row, Col} from 'react-bootstrap';

export default class AddInventory extends Component {
	render() {
		return (			<div>
				<h2 style = {{textAlign: "center"}}>Item Information</h2>
				<Grid>
					<Row className="show-grid">
						<Col xs={6} md={6}>
							<ItemInfo/>
						</Col>
						<Col xs={6} md={6}>
							<UploadImages/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

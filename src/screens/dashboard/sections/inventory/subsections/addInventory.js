import React,{Component} from 'react';

// Importing other components
import UploadImage from './components/uploadImage.js';

export default class AddInventory extends Component {
	render() {
		return (
			<div>
				<h2>Add item to Inventory!</h2>
				<UploadImage/>
			</div>
		);
	}
}

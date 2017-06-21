import React,{Component} from 'react';

// Importing other components
import UploadImage from './components/uploadImage.js';

var textAlign = {
	textAlign: 'center',
	border: '2px solid black'
}

export default class AddInventory extends Component {
	render() {
		return (
			<div>
				<h2>Add item to Inventory!</h2>
				<p>Orei!</p>
				<UploadImage/>
			</div>
		);
	}
}

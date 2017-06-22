import React,{Component} from 'react';

// Importing other components
//import Test from './components/test.js';
import UploadImages from './components/uploadImages.js';
import ItemInfo from './components/itemInfo.js';

export default class AddInventory extends Component {
	render() {
		return (
			<div>
				<h2>Add item to Inventory!</h2>
				<ItemInfo/>
				<UploadImages/>
			</div>
		);
	}
}

import React,{Component} from 'react';

// Components
import InventoryGallery from './components/inventoryGallery.js';

export default class ListInventory extends Component {
  render() {
    return (
    	<div>
			<h1>Your Inventory!</h1>
			<InventoryGallery/>
		</div>
    );
  }
}

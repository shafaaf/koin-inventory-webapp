import React,{Component} from 'react';

// Components
import InventoryGallery from './components/inventoryGallery.js';

export default class ListInventory extends Component {
  render() {
    return (
    	<div>
			<h2>Your Inventory!</h2>
			<InventoryGallery/>
		</div>
    );
  }
}

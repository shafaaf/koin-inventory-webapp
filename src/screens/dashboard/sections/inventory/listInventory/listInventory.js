import React,{Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

// Components
import InventoryGallery from './components/inventoryGallery.js';

const items = [
  <SidebarItem>Dashboard</SidebarItem>,
  <SidebarItem>Profile</SidebarItem>,
  <SidebarItem>Settings</SidebarItem>,
];


export default class ListInventory extends Component {
  render() {
    return (
    	<div>
    		<Sidebar style = {{paddingTop:"100px"}} background = {"#000000"} color = {"#818181"} width = {150} content={items}>
				<h2 style = {{paddingTop:"40px"}}>Your Inventory!</h2>
    			<InventoryGallery/>
  			</Sidebar>
		</div>
    );
  }
}

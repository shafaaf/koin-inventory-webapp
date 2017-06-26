import React,{Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

// Components
import InventoryGallery from './components/inventoryGallery.js';

const items = [
  <SidebarItem>Dashboard</SidebarItem>,
  <SidebarItem>Appetizers</SidebarItem>,
  <SidebarItem hoverHighlight = {"white"}>Popular</SidebarItem>,
];


export default class ListInventory extends Component {
  render() {
    return (
    	
    		<Sidebar style = {{paddingTop:"100px"}} background = {"#000000"} color = {"#818181"} width = {150} content={items}>
  				<div style = {{paddingLeft: "1%", paddingRight: "1%", marginTop:"3%"}}>
            <h2 style = {{paddingTop:"40px"}}>Your Inventory!</h2>
      			<InventoryGallery/>
    			</div>
        </Sidebar>
    );
  }
}

import React,{Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

// Components
// Import InventoryGallery from './components/oldGallery/inventoryGallery.js';
// Just use <InventoryGallery/> to get old gallery back
import ItemGallery from './components/gallery/itemGallery.js';
import Scrollchor from 'react-scrollchor';
import {Grid} from 'react-bootstrap';

// Get these from server
var categories = [
  {
    "category":"appetizers",
    "header":"Appetizer Items"
  },
  {
    "category":"popular",
    "header":"Popular Items"
  },
  {
    "category":"desserts",
    "header":"Dessert Items"
  },
  {
    "category":"drinks",
    "header":"Drinks Items"
  },
];

// Todo: Change the sidebar and categories from server
const items = [
  <SidebarItem> {/*Todo: This part hidden so makes sidebar work. Fix this silly bug*/}
    Test
  </SidebarItem>,

  <SidebarItem>
    <Scrollchor to="#appetizers" animate={{offset: -20, duration: 600}} className="nav-link">Appetizers</Scrollchor>
  </SidebarItem>,

  <SidebarItem>
    <Scrollchor to="#popular" animate={{offset: 20, duration: 600}} className="nav-link">Popular</Scrollchor>
  </SidebarItem>,

  <SidebarItem>
    <Scrollchor to="#desserts" className="nav-link">Desserts</Scrollchor>
  </SidebarItem>,

  <SidebarItem>
    <Scrollchor to="#drinks" className="nav-link">Drinks</Scrollchor>
  </SidebarItem>
];

// Make bottom call dynamically generated
export default class ListInventory extends Component {
  render() {
    return (  
    		<Sidebar style = {{paddingTop:"100px"}} background = {"#000000"} color = {"#818181"} width = {150} content={items}>
          <div style = {{paddingLeft: "3%", paddingRight: "1%", marginTop:"3%"}}>
            <h2 style = {{paddingTop:"40px"}}>Your Inventory!</h2>
            <div id='appetizers'>
              <h3>Appetizer Items</h3>
              <ItemGallery/>
              <br/><br/><br/><br/><br/>
            </div>
            <div id='popular'>
              <h3>Popular Items</h3>
              <ItemGallery/>
              <br/><br/><br/><br/><br/>
            </div>
            <div id='desserts'>
              <h3>Dessert Items</h3>
              <ItemGallery/>
              <br/><br/><br/><br/><br/>  
            </div>
            <div id='drinks'>
              <h3>Drinks Items</h3>
              <ItemGallery/>
              <br/><br/><br/><br/><br/>
            </div>
    			</div>
        </Sidebar>
    );
  }
}

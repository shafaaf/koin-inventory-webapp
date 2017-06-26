import React,{Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

// Components
// Import InventoryGallery from './components/oldGallery/inventoryGallery.js';
// Just use <InventoryGallery/> to get old gallery back
import ItemGallery from './components/gallery/itemGallery.js';
import Scrollchor from 'react-scrollchor';
import {Grid} from 'react-bootstrap';

// Todo: Get these from server
var categories = [
  {
    "category":"Test", /*Todo: This part hidden so makes sidebar work. Fix this silly bug*/
    "header":"Test"
  },
  {
    "category":"Appetizers",
    "header":"Appetizer Items",

  },
  {
    "category":"Popular",
    "header":"Popular Items",

  },
  {
    "category":"Desserts",
    "header":"Dessert Items",

  },
  {
    "category":"Drinks",
    "header":"Drinks Items",
  }
];

const itemCategories = [
  <SidebarItem>
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
  constructor(props) {
    console.log("listInventory: On constructor");
    super(props);
    this.state = {
      categories: categories
    };
  }

  makeCategoryIdName(string) {
    console.log("makeCategoryIdName: string is: ", string);
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  renderSidebar(){
    var categories = this.state.categories;
    const sidebarCategories = categories.map((category, index) =>
      <SidebarItem key={index}>
        <Scrollchor to = {this.makeCategoryIdName(category.category)} className="nav-link">{category.category}</Scrollchor>
      </SidebarItem>
    );
    return sidebarCategories;
  }

  render() {
    return (
    		<Sidebar style = {{paddingTop:"100px"}} background = {"#000000"} color = {"#818181"} width = {150} content={this.renderSidebar()}>
          <div style = {{paddingLeft: "3%", paddingRight: "1%", marginTop:"3%"}}>
            <h2 style = {{paddingTop:"40px"}}>Your Inventory!</h2>
            
            <div id='appetizers'>
              <h3>Appetizer Items</h3>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div id='popular'>
              <h3>Popular Items</h3>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div id='desserts'>
              <h3>Dessert Items</h3>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> 
            </div>
            <div id='drinks'>
              <h3>Drinks Items</h3>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>

    			</div>
        </Sidebar>
    );
  }
}

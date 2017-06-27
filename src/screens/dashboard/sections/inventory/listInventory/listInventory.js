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
    "category":"Test", /* Todo: This part hidden so makes sidebar work. Fix this silly bug*/
    "header":"Test"
  },
  {
    "category":"Appetizers",
    "header":"Appetizers Items",
  },
  {
    "category":"Popular",
    "header":"Popular Items",
  },
  {
    "category":"Dinner",
    "header":"Dinner Items",
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

// Make bottom call dynamically generated
export default class ListInventory extends Component {
  constructor(props) {
    console.log("listInventory: On constructor");
    super(props);
    this.state = {
      categories: categories
    };
  }

  /* To make the id for each category section to use sidebar for navigation */
  makeCategoryIdName(string) { 
    //console.log("makeCategoryIdName: string is: ", string);
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  /* Todo: Doing a hack to not show the test catgory items. Fix this imp. */
  renderSidebar(){
    var categories = this.state.categories;
    const sidebarCategories = categories.map((category, index) =>
      <SidebarItem key={index}>
        <Scrollchor to = {this.makeCategoryIdName(category.category)} className="nav-link">{category.category}</Scrollchor>
      </SidebarItem>
    );
    return sidebarCategories;
  }

  // Render each category's food items
  /* Todo: Doing a hack to not show the test catgory items. Fix this imp. */
  renderItems(){
    var categories = this.state.categories;
    const foodItemGallery = categories.map((category, index) => category.category != "Test" ?
      <div id={this.makeCategoryIdName(category.category)}>
        <h3>{category.header}</h3>
        <ItemGallery category = {category.category}/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div> : null
    );
    return foodItemGallery;
  }

  render() {
    return (
  		<Sidebar background = {"#000000"} color = {"#818181"} width = {150} content={this.renderSidebar()}>
        <div style = {{paddingLeft: "3%", paddingRight: "1%", marginTop:"3%"}}>
          <h2 style = {{paddingTop:"40px"}}>Your Inventory!</h2>
          
          {this.renderItems()}
          {/*<div id='appetizers'>
            <h3>Appetizer Items</h3>
            <ItemGallery/>
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
          <div id='dinner'>
            <h3>Drinks Items</h3>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>*/}
          
  			</div>
      </Sidebar>
    );
  }
}

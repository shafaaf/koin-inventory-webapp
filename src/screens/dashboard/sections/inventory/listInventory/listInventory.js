import React,{Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

// Components
// Import InventoryGallery from './components/oldGallery/inventoryGallery.js';
// Just use <InventoryGallery/> to get old gallery back
import ItemGallery from './components/gallery/itemGallery.js';
import Scrollchor from 'react-scrollchor';
import {Grid, Row} from 'react-bootstrap';

// Todo: Get these from server
var categories = [
  {
    "category":"Test", /* Todo: This part hidden so makes sidebar work. Fix this silly bug*/
    "header":"Test",
    "description": "Test"
  },
  {
    "category":"Appetizers",
    "header":"Appetizers Items",
    "description": "Insane appetizers to start with!"
  },
  {
    "category":"Popular",
    "header":"Popular Items",
    "description": "Everyone loves these!"
  },
  {
    "category":"Dinner",
    "header":"Dinner Items",
    "description": "Dinner with mom or wife? See these!"
  },
  {
    "category":"Desserts",
    "header":"Dessert Items",
    "description": "Nothing to say about these!"
  },
  {
    "category":"Drinks",
    "header":"Drinks Items",
    "description": "To dry your mouth!"
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
      <Row className="show-grid" id={this.makeCategoryIdName(category.category)}>
        <h3>{category.header}</h3>
        <p>{category.description}</p>
        <ItemGallery category = {category.category}/>
      </Row> : null
    );
    return foodItemGallery;
  }

  render() {
    return (
  		<Sidebar background = {"#000000"} color = {"#818181"} width = {150} content={this.renderSidebar()}>
        <div style = {{paddingLeft: "3%", marginTop:"5%"}}>
          <h2 style = {{marginTop:"100px"}}>Your Inventory!</h2>
          <Grid>
            {this.renderItems()}
          </Grid>
  			</div>
      </Sidebar>
    );
  }
}

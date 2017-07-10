import React,{Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

// Components
// Import InventoryGallery from './components/oldGallery/inventoryGallery.js';
// Just use <InventoryGallery/> to get old gallery back
import ItemGallery from './components/gallery/itemGallery';
import ItemModal from './components/gallery/itemModal';

import Scrollchor from 'react-scrollchor';
import {Grid, Row} from 'react-bootstrap';


var sidebarStyle = {
  border: '1px solid #ddd',
  marginTop: '100px'
}


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

export default class ListInventory extends Component {
  constructor(props) {
    console.log("listInventory: On constructor");
    super(props);
    this.state = {
      categories: categories,
      showModal: false,
      modalProduct: null
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

   // Show item modal
  onClickItem(item){
    //console.log("onClickItem: item to change state is: ", item);
    this.setState({
      modalProduct: item,
      showModal: true
    });
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
      <SidebarItem key={index} background  = {"#000000"}>
        <Scrollchor style = {{color: '#9d9d9d'}} to = {this.makeCategoryIdName(category.category)}>{category.category}</Scrollchor>
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
        <h3 style = {{textAlign : "center"}}>{category.header}</h3>
        <p style  = {{textAlign : "center"}}>{category.description}</p>
        <br/>
        <ItemGallery onClickItem={this.onClickItem.bind(this)} category={category.category}/>
      </Row> : null
    );
    return foodItemGallery;
  }

  componentWillMount() {
    console.log("listInventory.js: componentWillMount here.");
  }


  render() {
    return (
      <Sidebar style = {sidebarStyle} breakPoint = {600} background = {"#000000"} color = {"#818181"} width = {150} content={this.renderSidebar()}>
        <div style = {{paddingLeft: "3%", marginTop:"5%", overflowX: "hidden"}}>
          <h2 style = {{marginTop:"45px", marginLeft:"10px"}}>Your Inventory!</h2>
          {this.renderItems()}
          <ItemModal modalProduct={this.state.modalProduct} showModal = {this.state.showModal} onHide = {this.close.bind(this)}/>
        </div>
      </Sidebar>
    );
  }
}
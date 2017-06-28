import React,{Component} from 'react';
import {Grid, Row, Col, Button, Modal} from 'react-bootstrap';

// Components
import ItemModal from './itemModal';

var colStyle = {
	textAlign: 'center',
	border: '1px solid #ddd',
	cursor:"pointer"
}

// Todo: Get this data from server
var itemsTest = [

	/* Appetizers */ 
	{
		"productName": "One Two Punch Protein Pack",
		"price":"26.0",
		"category":"Appetizers",
		"quantity":"24",
		"img":"https://www.bodybuilding.com/fun/images/2013/4-muscle-meals-cory-gregory-image3b.jpg",
		"description":"Fuel your day with this one-two punch n, spirulina, blueberry, banana, almond milk) and full.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Nourishing Detox Pack",
		"price":"21.0",
		"category":"Appetizers",
		"quantity":"41",
		"img":"https://barilla.azureedge.net/~/media/images/en_us/hero-images/oven-ready-lasagna.jpg",
		"description":"Nourish your system with this curated detox meal, jam-packed with plant based nutrition.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Treat Yourself",
		"price":"12.5",
		"category":"Appetizers",
		"quantity":"15",
		"img":"https://www.thesun.co.uk/wp-content/uploads/2017/01/gettyimages-185071735.jpg?strip=all&w=960",
		"description":"Put a smile on your face with these Fresh favourites, in what we consider the perfect co",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Bruschetta",
		"price":"5",
		"category":"Appetizers",
		"quantity":"10",
		"img":"https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg",
		"description":null,
		"additionalNotes":null
	},

	/* Popular */ 
	{
		"productName": "Double Stacked Grilled Cheese",
		"price":"5",
		"category":"Popular",
		"quantity":"41",
		"img":"https://images-gmi-pmc.edge-generalmills.com/a11b2358-d2c9-4b9a-980f-a7164114fc33.jpg",
		"description":"Mozzarella and cheddar cheese melted together between slices of egg loaf bread.",
		"additionalNotes":null
	},
	{
		"productName": "Arugula Salad",
		"price":"12",
		"category":"Popular",
		"quantity":"16",
		"img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCv00v61Nh4XNMeOgD_1VItf0YNQ3BNeCDjlSdzzbzwoTPQu-1uw",
		"description":"Topped with goat cheese, walnuts, avocado, and dried cranberries with balsamic dressing.",
		"additionalNotes":null
	},
	{
		"productName": "Mac and Cheese",
		"price":"7",
		"category":"Popular",
		"quantity":"11",
		"img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlht7FcxlQdIm4zcoK6L8TrtP0A2tm2tOeSgn4UacABwDx0Onyw",
		"description":"Aged cheddar and parmesan with elbow noodles, cream sauce, and Dijon mustard.",
		"additionalNotes":null
	},
	{
		"productName": "Penne Chicken",
		"price":"14",
		"category":"Popular",
		"quantity":"50",
		"img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2-JN1zR6E0BVavTHiCx1S8Y-dydFBGTJTc_iBD1DfOXhylcNt",
		"description":"Penne with grilled chicken, mushrooms, red peppers, onions, garlic, and parmesan in a white cream sauce.",
		"additionalNotes":null
	},
	
	/* Dinner */
	{
		"productName": "Pepperoni Pizza",
		"price":"12",
		"category":"Dinner",
		"quantity":"75",
		"img":"https://www.skymetweather.com/themes/skymet/images/gallery/toplists/Top-Not-to-miss-food-items-in-Monsoon/5.jpg",
		"description":"Tomato sauce, basil, cheese, and pepperoni.",
		"additionalNotes":null
	},
	{
		"productName": "Lasagna",
		"price":"4",
		"category":"Dinner",
		"quantity":"65",
		"img":"https://3.imimg.com/data3/NP/OI/MY-10204974/non-vegetarian-food-items-500x500.jpg",
		"description":"Layers of fresh pasta, meat sauce, and mozzarella cheese with parmesan.",
		"additionalNotes":null
	},

	/* Desserts */
	{
		"productName": "Belgian Dark Chocolate Cake",
		"price":"8",
		"category":"Desserts",
		"quantity":"90",
		"img":"http://www.kraftcanada.com/-/media/kraft%20canada/recipes/620x423/c/chocolate-caramel-brownies-152180.jpg?h=423&w=620",
		"description":null,
		"additionalNotes":null
	},

	/* Drinks */
	{
		"productName": "Sparkling Water",
		"price":"2",
		"category":"Drinks",
		"quantity":"120",
		"img":"http://ruthtrumpold.id.au/blogs/designtech/wp-content/uploads/2012/12/plastic-bottled-water.jpg",
		"description":null,
		"additionalNotes":null
	},
	{
		"productName": "Still Water",
		"price":"1",
		"category":"Drinks",
		"quantity":"125",
		"img":"https://i.stack.imgur.com/Bvvvi.jpg",
		"description":null,
		"additionalNotes":null
	},
	{
		"productName": "Coke",
		"price":"5",
		"category":"Drinks",
		"quantity":"129",
		"img":"https://buy.shareacoke.com/media/social/share-1-my-friends-0.1.0-1-small.png",
		"description":null,
		"additionalNotes":null
	}
];

/* For each category make an instance of this */
export default class ItemGallery extends Component {
	constructor(props) {
		super(props);
		this.items = [];
		this.state = {
			showModal: false
		};
	}

	close() {
    	this.setState({ showModal: false });
  	}

  	open() {
    	this.setState({ showModal: true });
  	}


	/* Making item list for specific category for which prop passed in */
  	getItemList(category){	// Todo: May need to do this in some lifecycle method
  		var category = this.props.category;
  		console.log("getItemList() category is: ", category);
  		// Todo: Get from server. messy here - FIX
  		var items = this.items;
  		items.splice(0,items.length)

  		console.log("items is: ", items);
  		var itemsTestLength = itemsTest.length;
  		var i;
  		for (i = 0; i<itemsTestLength; i++){
  			if(itemsTest[i]["category"] == category){
  				items.push(itemsTest[i]);
  			}
  		}
  		console.log("items is: ", items);
  	}

  	/* Rendering item list for specific category for which prop passed in */
  	renderItemList(){
  		var category = this.props.category;
  		console.log("renderItemList() category is: ", category);
  		const items = this.items.map((item, index) =>
			<Col key={index} xs={12} sm={6} md={6} lg={6} style = {colStyle} onClick={this.open.bind(this)}>
				<p>
					<b>{item["productName"]} &nbsp;&nbsp; <i>${item["price"]}</i></b>
					<br/>
					{item["description"]}
					<br/>
					<img src={item["img"]} alt="Smiley face" height="200" width="240"/>
					<br/><br/><br/><br/>
				</p>
			</Col>
		);
		return items;
  	}

	render() {
		return (
			<div>			

				<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Text in a modal</h4>
						<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
						<h4>Popover in a modal</h4>
						<h4>Tooltips in a modal</h4>
						<hr />
						<h4>Overflowing text to show scroll behavior</h4>
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this)}>Close</Button>
					</Modal.Footer>
				</Modal>

				{this.getItemList()}
				{this.renderItemList()}

			</div>
		);
	}
}

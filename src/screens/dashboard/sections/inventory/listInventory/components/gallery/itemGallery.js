import React,{Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

var textAlign = {
	textAlign: 'center'
}

// Todo: Get this data from server
var itemsTest = [
	
	/* Appetizers */ 
	{
		"productName": "One Two Punch Protein Pack",
		"price":"26.0",
		"category":"Appetizers",
		"quantity":"24",
		"description":"Fuel your day with this one-two punch of protein. 16oz Vital Protein smoothie (Vega sport protein, spirulina, blueberry, banana, almond milk) and full",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Nourishing Detox Pack",
		"price":"21.0",
		"category":"Appetizers",
		"quantity":"41",
		"description":"Nourish your system with this curated detox meal, jam-packed with plant based nutrition. 16 oz Urban Detox, Detox Power Shot, All Star Salad with house dressing.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Treat Yourself",
		"price":"12.5",
		"category":"Appetizers",
		"quantity":"15",
		"description":"Put a smile on your face with these Fresh favourites, in what we consider the perfect combo! 16oz Charcoal Green Lemonade, BBQ Burger w/ Sweet Potato Fries and Chipotle mayo and a S'mores cookie.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Bruschetta",
		"price":"5",
		"category":"Appetizers",
		"quantity":"10",
		"description":"Diced tomatoes, garlic, basil, and olive oil.",
		"additionalNotes":"None"
	},


	/* Popular */ 
	{
		"productName": "Double Stacked Grilled Cheese",
		"price":"5",
		"category":"Popular",
		"quantity":"41",
		"description":"Mozzarella and cheddar cheese melted together between slices of egg loaf bread.",
		"additionalNotes":"None"
	},
	{
		"productName": "Arugula Salad",
		"price":"12",
		"category":"Popular",
		"quantity":"16",
		"description":"Topped with goat cheese, walnuts, avocado, and dried cranberries with balsamic dressing.",
		"additionalNotes":"None"
	},
	{
		"productName": "Mac and Cheese",
		"price":"7",
		"category":"Popular",
		"quantity":"11",
		"description":"Aged cheddar and parmesan with elbow noodles, cream sauce, and Dijon mustard.",
		"additionalNotes":"None"
	},
	{
		"productName": "Penne Chicken",
		"price":"14",
		"category":"Popular",
		"quantity":"50",
		"description":"Penne with grilled chicken, mushrooms, red peppers, onions, garlic, and parmesan in a white cream sauce.",
		"additionalNotes":"None"
	},
	
	/* Dinner */
	{
		"productName": "Pepperoni Pizza",
		"price":"12",
		"category":"Dinner",
		"quantity":"75",
		"description":"Tomato sauce, basil, cheese, and pepperoni.",
		"additionalNotes":"None"
	},
	{
		"productName": "Lasagna",
		"price":"4",
		"category":"Dinner",
		"quantity":"65",
		"description":"Layers of fresh pasta, meat sauce, and mozzarella cheese with parmesan.",
		"additionalNotes":"None"
	},

	/* Desserts */
	{
		"productName": "Belgian Dark Chocolate Cake",
		"price":"8",
		"category":"Desserts",
		"quantity":"90",
		"description":"None",
		"additionalNotes":"None"
	},

	/* Drinks */
	{
		"productName": "Sparkling Water",
		"price":"2",
		"category":"Drinks",
		"quantity":"120",
		"description":"None",
		"additionalNotes":"None"
	},
	{
		"productName": "Still Water",
		"price":"1",
		"category":"Drinks",
		"quantity":"125",
		"description":"None",
		"additionalNotes":"None"
	},
	{
		"productName": "Coke",
		"price":"5",
		"category":"Drinks",
		"quantity":"129",
		"description":"None",
		"additionalNotes":"None"
	}
];

/* For each category make an instance of this */
export default class ItemGallery extends Component {
	constructor(props) {
		super(props)
		this.items = []
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
			<Col key={index} xs={12} sm={6} md={6} lg={6} style = {textAlign}>
				<p>
					<b>{item["productName"]}</b>
					<br/>
					{item["description"]}
					<br/><br/><br/><br/>
				</p>
			</Col>
		);
		return items;
  	}

	render() {
		return (
			<div>
				{this.getItemList()}
				{this.renderItemList()}
			</div>
		);
	}
}

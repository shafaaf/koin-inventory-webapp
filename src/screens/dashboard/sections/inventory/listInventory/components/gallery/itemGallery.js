import React,{Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

var textAlign = {
	textAlign: 'center'
}

// Todo: Get this data from server
var itemsTest = [
	{
		"productName": "One Two Punch Protein Pack",
		"price":"26.0",
		"category":"Appetizer",
		"quantity":"24",
		"description":"Fuel your day with this one-two punch of protein. 16oz Vital Protein smoothie (Vega sport protein, spirulina, blueberry, banana, almond milk) and full size Powerhouse on rice.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Nourishing Detox Pack",
		"price":"21.0",
		"category":"Appetizer",
		"quantity":"41",
		"description":"Nourish your system with this curated detox meal, jam-packed with plant based nutrition. 16 oz Urban Detox, Detox Power Shot, All Star Salad with house dressing.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	},
	{
		"productName": "Treat Yourself",
		"price":"12.5",
		"category":"Appetizer",
		"quantity":"15",
		"description":"Put a smile on your face with these Fresh favourites, in what we consider the perfect combo! 16oz Charcoal Green Lemonade, BBQ Burger w/ Sweet Potato Fries and Chipotle mayo and a S'mores cookie.",
		"additionalNotes":"Our premises are not gluten, soy or nut free. We cannot guarantee 100% that any item will not come into contact with gluten or other potential allergens during preparation. To ensure accuracy, please do not write add-ons in the ‘special instructions’ box. Go to the “add-ons” section of the menu for a comprehensive list of sides."
	}
];

export default class ItemGallery extends Component {
  render() {
    return (
    	<div>
			<p>Some description of category</p>
		    <Row className="show-grid" style = {{paddingBottom:"5%"}}>
				<Col xs={12} sm={6} md={6} style = {textAlign}>
					{
						Object.keys(itemsTest[0]).map((key, index) => ( 
				          <p key={index}> {key}: {itemsTest[0][key]}</p> 
				        ))
					}
				</Col>
				<Col xs={12} sm={6} md={6} style = {textAlign}>
					{
						Object.keys(itemsTest[1]).map((key, index) => ( 
				          <p key={index}> {key}: {itemsTest[0][key]}</p> 
				        ))
					}
				</Col>
			</Row>
			<Row className="show-grid">
				<Col xs={12} sm={6} md={6} style = {textAlign}>
					<code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
				</Col>
				<Col xs={12} sm={6} md={6} style = {textAlign}>
					<code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
				</Col>
			</Row>
		</div>
    );
  }
}

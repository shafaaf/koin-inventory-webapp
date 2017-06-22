import React,{Component} from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap';

export default class ItemInfo extends Component {
  render() {
    return (
    	<div>
			<Form horizontal>
				<FormGroup controlId="formHorizontalProduct">
					<Col componentClass={ControlLabel} sm={2}>
						Product
					</Col>
					<Col sm={10}>
						<FormControl type="text" placeholder="Product" />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPrice">
					<Col componentClass={ControlLabel} sm={2}>
						Price
					</Col>
					<Col sm={10}>
						<FormControl type="text" placeholder="Price" />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalQuantity">
					<Col componentClass={ControlLabel} sm={2}>
						Quantity
					</Col>
					<Col sm={10}>
						<FormControl type="text" placeholder="Quantity" />
					</Col>
				</FormGroup>

				 <FormGroup controlId="formHorizontalDescription">
      				<Col componentClass={ControlLabel} sm={2} md={2}>
						Description
					</Col>
					<Col sm={10} md={10}>
						<FormControl componentClass="textarea" rows="4" placeholder="Description" />
					</Col>
    			</FormGroup>

    			 <FormGroup controlId="formHorizontalAdditionalNotes">
      				<Col componentClass={ControlLabel} sm={2}>
				 		Notes
					</Col>
					<Col sm={10}>
						<FormControl componentClass="textarea" rows="4" placeholder="Notes" />
					</Col>
    			</FormGroup>
    			
    			<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button type="submit">
							Add Product
						</Button>
					</Col>
				</FormGroup>
			</Form>
		</div>
    );
  }
}
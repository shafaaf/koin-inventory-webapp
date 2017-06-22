import React,{Component} from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap';



export default class ItemInfo extends Component {
  render() {
    return (
    	<div>
			<h2 style = {{textAlign: "center"}}>Item info</h2>
			<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Product
					</Col>
					<Col sm={10}>
						<FormControl type="email" placeholder="Email" />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPassword">
					<Col componentClass={ControlLabel} sm={2}>
						Quantity
					</Col>
					<Col sm={10}>
						<FormControl type="password" placeholder="Password" />
					</Col>
				</FormGroup>

				 <FormGroup controlId="formControlsTextarea">
      				<Col componentClass={ControlLabel} sm={2}>
						Description
					</Col>
					<Col sm={10}>
						<FormControl componentClass="textarea" placeholder="textarea" />
					</Col>
    			</FormGroup>


				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button type="submit">
							Sign in
						</Button>
					</Col>
				</FormGroup>
			</Form>
		</div>
    );
  }
}
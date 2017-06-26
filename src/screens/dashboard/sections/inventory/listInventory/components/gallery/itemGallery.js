import React,{Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

var textAlign = {
	textAlign: 'center'
}

export default class ItemGallery extends Component {
  render() {
    return (
    	<div>
			<p>Bro item gallery</p>
		    <Row className="show-grid" style = {{paddingBottom:"5%"}}>
				<Col xs={12} sm={6} md={6} style = {textAlign}>
					<code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
				</Col>
				<Col xs={12} sm={6} md={6} style = {textAlign}>
					<code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
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
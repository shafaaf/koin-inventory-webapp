import React,{Component} from 'react';

import {Grid, Row, Col} from 'react-bootstrap';

export default class ItemGallery extends Component {
  render() {
    return (
    	<div>
			<p>Bro item gallery</p>
			<Grid>
			    <Row className="show-grid">
					<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
					<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
					<Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
				</Row>
     		</Grid>
		</div>
    );
  }
}
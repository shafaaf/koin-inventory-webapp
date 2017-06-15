import React,{Component} from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

// Import styles
import './profile.css';


export default class MainContents extends Component {
  render() {
    return (
    	<div id="mainContents" style = {this.props.mainStyles}>
			<h2>Welcome to your dashboard</h2>
			<p>Fell free to move around using the side navigation bar!</p>
			{this.renderMenuToggle()}
			<br/>
			<Button id = "logoutButton" onClick={this.facebookLogout.bind(this)} bsSize="small" bsStyle="danger">Log outz</Button>
		</div>
    );
  }
}
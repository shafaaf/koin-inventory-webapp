import React,{Component} from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import SideMenu from './sideMenu';

// Import styles
import './profile.css';

var spanStyles = {
  fontSize:'30px',
  cursor:'pointer'
};

export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			showNavBar: false
		};
	}	

	facebookLogout(){
		// 1. Remove koinToken from storage
		// 2. Change state to null to render again
		console.log("facebook logout called");
		localStorage.removeItem("koinToken");
		this.props.onChangeLoginStatus(null);
	}

	mainStyles(){	//styles for the main div
		if(this.state.showNavBar){
			return {
				marginLeft: "30%"
			}
		}
		else{
			return{
				marginLeft: 0
			}
		}
	}	

	openNav(){
		console.log("At openNav");
		this.setState({ showNavBar: true});
	}

	closeNav() {
		console.log("At closeNavbar");
		this.setState({ showNavBar: false});
	}

	renderMenuToggle(){
		if(this.state.showNavBar){
			return(
				<span style={spanStyles} onClick={this.closeNav.bind(this)}>&#9776; Close</span>
			)
		}
		else{
			return(
				<span style={spanStyles} onClick={this.openNav.bind(this)}>&#9776; Open</span>
			)
		}
	}

	render() {
		return (
			<div className = "container">
				<SideMenu showNavBar = {this.state.showNavBar} closeNav = {this.closeNav.bind(this)}/>
				<div id="main" style = {this.mainStyles()}>
					<h2>Welcome to your dashboard</h2>
					<p>Fell free to move around using the side navigation bar!</p>
					{this.renderMenuToggle()}
					<br/>
					<Button id = "logoutButton" onClick={this.facebookLogout.bind(this)} bsSize="small" bsStyle="danger">Log outz</Button>
				</div>
				
			</div>
		);
	}
}
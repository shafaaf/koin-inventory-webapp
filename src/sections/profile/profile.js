import React,{Component} from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom'

//Importing other components
import SideMenu from './sideMenu';
import DashboardIntro from './dashboardIntro.js';
import Inventory from './inventory.js';
import Settings from './settings.js';
import Transactions from './transactions.js';

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
				marginLeft: "30%",
				overflowY: "scroll",
				overflowX: "hidden"
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
				<span style={spanStyles} onClick={this.closeNav.bind(this)}>&#9776; Close Menu</span>
			)
		}
		else{
			return(
				<span style={spanStyles} onClick={this.openNav.bind(this)}>&#9776; Open Menu</span>
			)
		}
	}

	render() {
		return (
			<div className = "container">
				<SideMenu showNavBar = {this.state.showNavBar} closeNav = {this.closeNav.bind(this)}/>
				<div id="main" style = {this.mainStyles()}>
					{this.renderMenuToggle()}
					<br/>
					<Button id = "logoutButton" onClick={this.facebookLogout.bind(this)} bsSize="small" bsStyle="danger">Log outz</Button>
					<div className = "container">
						<Switch>
							<Route exact path='/profile' component={DashboardIntro}/>
							<Route path='/profile/inventory' component={Inventory}/>
							<Route path='/profile/settings' component={Settings}/>
							<Route path='/profile/transactions' component={Transactions}/>
						</Switch>
					</div>
					
				</div>	
			</div>
		);
	}
}
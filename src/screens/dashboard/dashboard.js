import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom'
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

//Importing other sections
import SideMenu from './sections/sideMenu';
import DashboardIntro from './sections/dashboardIntro.js';
import Inventory from './sections/inventory/inventory.js';
import Settings from './sections/settings.js';
import Transactions from './sections/transactions.js';
import ContactUs from './sections/contactUs/contactUs.js';

// Import styles
import './dashboard.css';

// Some styles
var spanStyles = {
  fontSize:'30px',
  cursor:'pointer'
};


var textAlignCenter = {
	textAlign:"center"
};

export default class Dashboard extends Component {
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
		if(this.state.showNavBar){ //when theres a sidebar
			return {
				marginLeft: "30%",
				overflowY: "hidden",
				overflowX: "hidden"
			}
		}
		else{
			return{	//when no sidebar
				marginLeft: 0,
				overflowY: "hidden",
				overflowX: "hidden"
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
					
					<Switch>
						<Route exact path='/dashboard' component={DashboardIntro}/>
						<Route path='/dashboard/inventory' component={Inventory}/>
						<Route path='/dashboard/transactions' component={Transactions}/>
						<Route path='/dashboard/settings' component={Settings}/>
						<Route path='/dashboard/contactus' component={ContactUs}/>
					</Switch>
				</div>	
			</div>
		);
	}
}
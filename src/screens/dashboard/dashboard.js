import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';

// Importing other page sections
import Navbar from './components/myNavBar.js';
import DashboardIntro from './sections/dashboardIntro.js';

import Inventory from './sections/inventory/subsections/inventory.js';
import AddInventory from './sections/inventory/subsections/addInventory';

import Transactions from './sections/transactions.js';
import Settings from './sections/settings.js';
import ContactUs from './sections/contactUs/contactUs.js';

// Importing styles
import './dashboard.css';

export default class Dashboard extends Component {
	facebookLogout(){
		// 1. Remove koinToken from storage
		// 2. Change state to null to render again
		console.log("facebook logout called");
		localStorage.removeItem("koinToken");
		this.props.onChangeLoginStatus(null);
	}

	render() {
		return (
			<div>
				<div className = "container">
					<Navbar onLogOut = {this.facebookLogout.bind(this)}/>
				</div>
				<div className = "container"> {/* Main content section here. Add sections like transations etc here.*/}
					<br/>
					<Switch> {/*Content for each different section*/}
						<Route exact path='/dashboard' component={DashboardIntro}/>
						
						{/* Inventory Sections*/}
						<Route exact path='/dashboard/inventory/' component={Inventory}/>
						<Route exact path='/dashboard/inventory/add' component={AddInventory}/>

						<Route exact path='/dashboard/transactions' component={Transactions}/>
						<Route exact path='/dashboard/settings' component={Settings}/>
						<Route exact path='/dashboard/contactus' component={ContactUs}/>
					</Switch>
				</div>	
			</div>
		);
	}
}
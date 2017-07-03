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
import Routes from './components/routes.js';
import DashboardIntro from './sections/dashboardIntro.js';
import ListInventory from './sections/inventory/listInventory/listInventory';
import AddInventory from './sections/inventory/addInventory/addInventory';
import Transactions from './sections/transactions/transactions.js';
import Settings from './sections/settings/settings.js';
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
					<Routes/>
				</div>	
			</div>
		);
	}
}
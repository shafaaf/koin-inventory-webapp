import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';

// Importing other page sections
import Navbar from './myNavBar.js';
import DashboardIntro from './sections/dashboardIntro.js';
import Inventory from './sections/inventory/inventory.js';
import Transactions from './sections/transactions.js';
import Settings from './sections/settings.js';
import ContactUs from './sections/contactUs/contactUs.js';

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

	render() {
		return (
			<div>
				<Navbar onLogOut = {this.facebookLogout.bind(this)}/>
				<div className = "container">
					<br/>
					<Switch> {/*Content for each different section*/}
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
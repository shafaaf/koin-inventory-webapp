/* Add sections like transations etc here. */

import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';

// Importing other page sections
import DashboardIntro from '../sections/dashboardIntro.js';
import ListInventory from '../sections/inventory/listInventory/listInventory';
import AddInventory from '../sections/inventory/addInventory/addInventory';
import Transactions from '../sections/transactions/transactions.js';
import Settings from '../sections/settings/settings.js';
import ContactUs from '../sections/contactUs/contactUs.js';

export default class Routes extends Component {
  render() {
    return (
		<Switch> {/*Content for each different section*/}
			<Route exact path='/dashboard' component={DashboardIntro}/>
			{/* Inventory Sections */}
			<Route exact path='/dashboard/inventory/list' component={ListInventory}/>
			<Route exact path='/dashboard/inventory/add' component={AddInventory}/>
			{/* Other sections */}
			<Route exact path='/dashboard/transactions' component={Transactions}/>
			<Route exact path='/dashboard/settings' component={Settings}/>
			<Route exact path='/dashboard/contactus' component={ContactUs}/>
		</Switch>
    );
  }
}
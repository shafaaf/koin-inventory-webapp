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
import Home from '../sections/home/home';
// Inventory pages
import InventoryList from '../sections/inventory/inventoryList/inventoryList';
import InventoryAdd from '../sections/inventory/inventoryAdd/inventoryAdd';
import InventoryMenu from '../sections/inventory/inventoryMenu/inventoryMenu';
// Other pages
import Profile from '../sections/profile/profile.js';
import Transactions from '../sections/transactions/transactions';
import ContactUs from '../sections/contactUs/contactUs';
import NoPageFound from '../../noPageFound/noPageFound';

const Routes = () =>
    <Switch> {/*Content for each different section*/}
		<Route exact path='/dashboard' component={Home}/>
		{/* Inventory Sections */}
		<Route exact path='/dashboard/inventory/list' component={InventoryList}/>
		<Route exact path='/dashboard/inventory/add' component={InventoryAdd}/>
		<Route exact path='/dashboard/inventory/menu' component={InventoryMenu}/>
		{/* Other sections */}
		<Route exact path='/dashboard/profile' component={Profile}/>
		<Route exact path='/dashboard/transactions' component={Transactions}/>
		<Route exact path='/dashboard/contactus' component={ContactUs}/>
		<Route component ={NoPageFound}/>
	</Switch>

export default Routes;

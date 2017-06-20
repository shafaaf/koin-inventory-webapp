import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class MyNavBar extends Component {
  render() {
    return (
    	<div>
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link className = "menuItem" to= '/dashboard'>Koin Dashboard</Link>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1}>My Profile</NavItem>
						<NavItem eventKey={2}>
							<Link className = "menuItem" to='/dashboard/transactions'>My Transactions</Link>
						</NavItem>
						<NavDropdown eventKey={3} title="My Inventory" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>
								<Link className = "menuItem" to='/dashboard/inventory'>Current List</Link>
							</MenuItem>
							<MenuItem eventKey={3.2}>Add an item</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">Settings</NavItem>
						<NavItem eventKey={1}>
							<Link className = "menuItem" to='/dashboard/contactus'>Contact Us</Link>
						</NavItem>
						<NavItem eventKey={2} href="#" onClick = {this.props.onLogOut}>Log Out</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
    );
  }
}
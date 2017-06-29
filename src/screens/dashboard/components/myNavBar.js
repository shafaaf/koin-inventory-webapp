import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class MyNavBar extends Component {
  render() {
    return (
    	<div>
			<Navbar inverse fixedTop collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link className = "menuItem" to= '/dashboard'>Koin Dashboard</Link>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1}>My Profile</NavItem>
						{/* Transactions tab */}
						<LinkContainer to="/dashboard/transactions">
							<NavItem eventKey={2}>My Transactions
							</NavItem>
						 </LinkContainer>
						{/* Inventory Dropdown */}
						<NavDropdown eventKey={3} title="My Inventory" id="basic-nav-dropdown">
							{/* Inventory List */}
							<LinkContainer to="/dashboard/inventory/list">
								<MenuItem eventKey={3.1}>
									Current list
								</MenuItem>
							</LinkContainer>
							{/* Add item to inventory */}
							<LinkContainer to="/dashboard/inventory/add">
								<MenuItem eventKey={3.2}>
									Add an item
								</MenuItem>
							</LinkContainer>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<LinkContainer to="/dashboard/contactus">
							<NavItem eventKey={1}>Contact Us
							</NavItem>
						</LinkContainer>
						<NavItem eventKey={2} href="#" onClick = {this.props.onLogOut}>Log Out</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
    );
  }
}
import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

// Import styles. Fix this
import '../dashboard.css';

const Test = () => (
  <div>
    <h2>Test</h2>
  </div>
)

export default class SideMenu extends Component {
	mySidenavStyles(){
		if(this.props.showNavBar){
			return {
				width: "30%"
			}
		}
		else{
			return{
				width: 0
			}
		}
	}

	render() {
		return (
			<div id="mySidenav" className="sidenav" style = {this.mySidenavStyles()}>
				<a className = "menuItem" href="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>&times;</a>
				<Link className = "menuItem" to= '/dashboard'>Home</Link>
				<Link className = "menuItem" to='/dashboard/inventory'>Inventory</Link>
				<Link className = "menuItem" to='/dashboard/transactions'>Transactions</Link>
				<Link className = "menuItem" to='/dashboard/settings'>Settings</Link>
				<Link className = "menuItem" to='/dashboard/contactus'>Contact Us</Link>
			</div>
		);
	}
}

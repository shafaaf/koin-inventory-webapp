import React,{Component} from 'react';

// Import styles
import './profile.css';


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
			<a className = "menuItem" href="#">Inventory</a>
			<a className = "menuItem" href="#">Services</a>
			<a className = "menuItem" href="#">Settings</a>
			<a className = "menuItem" href="#">Contact</a>
		</div>
	);
	}
}
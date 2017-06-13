import React,{Component} from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

// Import styles
import './styles.css';

export default class Profile extends Component {
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

	openNav(){
		// var object = this.refs.mySidenav;
		// object.style.width = "250px";
    	
		// var object2 = this.refs.main;
		// object2.style.width = "250px";
		console.log("At openNav");
		this.setState({ showNavBar: true});
	}

	closeNav() {
	 //    var object = this.refs.mySidenav;
		// object.style.width = "0px";
    	
		// var object2 = this.refs.main;
		// object2.style.width = "0px";

		console.log("At closeNavbar");
		this.setState({ showNavBar: false});
	}

	renderNavBarSection(){
		if(this.state.showNavBar){
			return (
				<div id="mySidenav" className="sidenav" ref="mySidenav">
					<a href="javascript:void(0)" className ="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
					<a href="#">About</a>
					<a href="#">Services</a>
					<a href="#">Clients</a>
					<a href="#">Contact</a>
				</div>
			)
		}
	}

	render() {
		return (
			<div className = "container">
				{this.renderNavBarSection()}
				<div id="main" ref = "main">
					<h1>Profile Page</h1>
					<Button bsStyle="danger" onClick={this.openNav.bind(this)}>open</Button>
					<Button id = "logoutButton" onClick={this.facebookLogout.bind(this)} bsSize="small" bsStyle="danger">Log outz</Button>
				</div>
			</div>
		);
	}
}

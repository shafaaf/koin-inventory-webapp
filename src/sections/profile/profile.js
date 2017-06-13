import React,{Component} from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

// Import styles
import './styles.css';

var spanStyles = {
  fontSize:'30px',
  cursor:'pointer'
};

export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			showNavBar: false
		};
	}

	mySidenavStyles(){
		if(this.state.showNavBar){
			return {
				width: "250px"
			}
		}
		else{
			return{
				width: 0
			}
		}
	}

	mainStyles(){
		if(this.state.showNavBar){
			return {
				marginLeft: "250px"
			}
		}
		else{
			return{
				marginLeft: 0
			}
		}
	}

	facebookLogout(){
		// 1. Remove koinToken from storage
		// 2. Change state to null to render again
		console.log("facebook logout called");
		localStorage.removeItem("koinToken");
		this.props.onChangeLoginStatus(null);
	}

	openNav(){
		console.log("At openNav");
		this.setState({ showNavBar: true});
	}

	closeNav() {
		console.log("At closeNavbar");
		this.setState({ showNavBar: false});
	}

	render() {
		return (
			<div className = "container">
				<div id="mySidenav" className="sidenav" style = {this.mySidenavStyles()}>
					<a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
					<a href="#">About</a>
					<a href="#">Services</a>
					<a href="#">Clients</a>
					<a href="#">Contact</a>
				</div>
				<div id="main" style = {this.mainStyles()}>
					<h2>Sidenav Push Example</h2>
					<p>Click on the element below to open the side navigation menu, and push this content to the right.</p>
					<span style={spanStyles} onClick={this.openNav.bind(this)}>&#9776; open</span>
				</div>
				<h1>Profile Page</h1>
				<Button bsStyle="danger" onClick={this.openNav.bind(this)}>open</Button>
				<Button id = "logoutButton" onClick={this.facebookLogout.bind(this)} bsSize="small" bsStyle="danger">Log outz</Button>
			</div>
		);
	}
}

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

// Importing components
import FacebookButton from './components/facebookButton';
import Home from './components/home';
import Profile from './components/profile';

// Importing CSS files
import './index.css';

console.log("Running index.js right now.");

//----------------------------------------------------------------

class Start extends Component {
  // Initialization
  constructor(props) {
    console.log("On constructor");
    super(props);
   
    // Load in Koin session token which say whether user logged in session or not.
    if (typeof(Storage) !== "undefined") {  // Check browser support
      if ((localStorage.getItem("koinToken") === null) || (localStorage.getItem("koinToken") === "")) {
        console.log("koinToken doesnt exist");
        this.state = {
          koinToken: null
        };
      }
      else { // Retrieve the Koin token
        var koinToken = localStorage.getItem("koinToken");
        console.log("koinToken exists and is: ", koinToken);
        this.state = {
          koinToken: koinToken
        };
      }
    } 
    else { // storage undefined
      console.log("Sorry, your browser does not support Web Storage...");
      this.state = {
        koinToken: null
      };
    }    
  }

  // Change the login state based on Koin Token
  // To login the user, pass in the Koin server session token
  changeLoginStatus(stateKoinToken){
    console.log("changeLoginStatus with a stateKoinToken of: ", stateKoinToken);
    this.setState({ koinToken: stateKoinToken});
  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" render={() => (
            this.state.koinToken != null ? (
              <Profile onChangeLoginStatus = {this.changeLoginStatus.bind(this)}/>
            ) : (
              <Redirect to="/login"/>
            ) 
          )}/>
          <Route exact path="/login" render={() => (
            this.state.koinToken != null ? (
              <Redirect to="/profile"/>
            ) : (
              <FacebookButton onChangeLoginStatus = {this.changeLoginStatus.bind(this)}/>
            )
          )}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Start/>, document.getElementById('demo'));


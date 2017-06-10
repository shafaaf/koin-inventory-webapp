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

class Start extends Component {
  constructor(props) {
    console.log("On constructor");
    super(props);
   
    if (typeof(Storage) !== "undefined") {  // Check browser support
      if ((localStorage.getItem("loggedIn") == null) || (localStorage.getItem("loggedIn") == "")) {
        console.log("loggedIn doesnt exist");
        this.state = {
          loggedIn: false
        };
      }
      else { // Retrieve
        var value = localStorage.getItem("loggedIn");
        console.log("loggedIn exists and is: ", value);
        this.state = {
        loggedIn: true
      };
      }
    } 
    else {
      console.log("Sorry, your browser does not support Web Storage...");
      this.state = {
        loggedIn: false
      };
    }    
  }

  changeLoginStatus(status){
    console.log("called at changeLoginStatus");
    this.setState({ loggedIn: true});
  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" render={() => (
            this.state.loggedIn == true ? (
               <Redirect to="/"/>
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


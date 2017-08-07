import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom'

import Home from './screens/home/home';
import Login from './screens/login/login';
import Dashboard from './screens/dashboard/dashboard';
import NoPageFound from './screens/noPageFound/noPageFound';

// ----------------------------------------------------------------

export default class App extends Component {
  constructor(props) {
    console.log("app.js: On constructor");
    super(props);
   
    // Load in Koin session token which say whether user logged in session or not.
    this.state = {
      koinToken: null
    };
    if (typeof(Storage) !== 'undefined') {  // Check browser support
      if ((localStorage.getItem("koinToken") == null) || (localStorage.getItem("koinToken") == "") || 
          (!(localStorage.getItem("koinToken")))) {
        console.log("koinToken doesnt exist");
        console.log("koinToken value computed is: ", localStorage.getItem("koinToken"));
        this.state = {
          koinToken: null
        };
      }
      else if (localStorage.getItem("koinToken")){ // Retrieve the Koin token
        var koinToken = localStorage.getItem("koinToken");
        console.log("koinToken exists and is: ", koinToken);
        this.state = {
          koinToken: koinToken
        };
      }
      else{
        console.log("Error: Some weird case in koin token checker.");
        console.log("koinToken value computed is: ", localStorage.getItem("koinToken"));
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
  changeLoginStatus(stateKoinToken){
    console.log("app.js: changeLoginStatus with a stateKoinToken of: ", stateKoinToken);
    this.setState({ koinToken: stateKoinToken});
  }

  // If user tries to visit dashboard, redirect user to login page
  dashboardPageVerification(){
    console.log("dashboardPageVerification: koinToken is: ", this.state.koinToken);
    if(this.state.koinToken){
      console.log("dashboardPageVerification: logged in so sending to dashboard, koinToken is: ", this.state.koinToken);
      return(
        <Dashboard onChangeLoginStatus = {this.changeLoginStatus.bind(this)}/>
      );
    }
    else{
      console.log("dashboardPageVerification: not logged in so sending to login. koinToken is: ", this.state.koinToken);
      return(
        <Redirect to="/login"/>
      );
    }
  }

  /* If user tries to visit login while logged in, 
    redirect them to login page */
  redirectToDashboard(){
    console.log("redirectToDashboard: koinToken is: ", this.state.koinToken);
    if(this.state.koinToken){
      console.log("redirectToDashboard: token exists and so redirecting to dashboard.");
      return (
        <Redirect to="/dashboard"/>
      );
    }
    else{
      console.log("redirectToDashboard: not logged in so show login page");
      return (
        <Login onChangeLoginStatus = {this.changeLoginStatus.bind(this)}/>
      );
    }
  }
  
  render() {
    console.log("===Rendering from start. koinToken is: ", this.state.koinToken);
    return(
      <Router>
        <div>
          <Switch>        
            <Route exact path="/" component={Home}/>
            <Route path="/dashboard" component = {this.dashboardPageVerification.bind(this)}/>
            <Route path="/login" component = {this.redirectToDashboard.bind(this)}/>
            <Route component ={NoPageFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}


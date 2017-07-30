import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom'

// Importing different screen components
import Home from './screens/home/home';
import Login from './screens/login/login';
import Dashboard from './screens/dashboard/dashboard';
import NoPageFound from './screens/noPageFound';

// ----------------------------------------------------------------

export default class App extends Component {
  constructor(props) {
    console.log("app.js: On constructor");
    super(props);
   
    this.facebookAccessToken = null; //info for merchant's profile
    // Load in Koin session token which say whether user logged in session or not.
    // Todo: Unsure when to acccess facebook access token
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
        var facebookAccessToken = localStorage.getItem("facebookAccessToken");
        console.log("facebookAccessToken exists and is: ", facebookAccessToken);
        this.facebookAccessToken = facebookAccessToken;
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
  changeLoginStatus(stateKoinToken, facebookAccessToken){
    console.log("changeLoginStatus with a stateKoinToken of: ", stateKoinToken);
    console.log("changeLoginStatus with a facebookAccessToken of: ", facebookAccessToken);
    this.facebookAccessToken = facebookAccessToken;
    this.setState({ koinToken: stateKoinToken});
  }


  // If user tries to visit dashboard, redirect user to login page
  dashboardPageVerification(){
    if(this.state.koinToken){
      console.log("dashboardPageVerification: logged in so sending to dashboard");
      return(
        <Dashboard facebookAccessToken = {this.facebookAccessToken} onChangeLoginStatus = {this.changeLoginStatus.bind(this)}/>
      );
    }
    else{
      console.log("dashboardPageVerification: not logged in so sending to login");
      return(
        <Redirect to="/login"/>
      );
    }
  }

  /* If user tries to visit login while logged, 
    redirect her/him to login page*/
  redirectToDashboard(){
    if(this.state.koinToken){
      return (
        <Redirect to="/dashboard"/>
      );
    }
    else{
      return (
        <Login onChangeLoginStatus = {this.changeLoginStatus.bind(this)}/>
      );
    }
  }

  render() {
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

ReactDOM.render(<App/>, document.getElementById('app'));

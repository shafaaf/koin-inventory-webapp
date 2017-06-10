import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

// Importing CSS files
import './index.css';

// Importing components
import App from './App';

console.log("Running index.js right now");

// ReactDOM.render(<FacebookButton/>, document.getElementById('root'));

const responseFacebook = (response) => {
  console.log("response is: ", response);
}

class FacebookButton extends Component {
  render() {
    return (
      <div>
        <FacebookLogin
          appId="1830088130643938"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"/>
      </div>
    );
  }
}

class Test extends Component {
  render() {
    return (
      <h1>Test page</h1>
    );
  }
}

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
  }
  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Test}/>
          <Route exact path="/login" loggedIn = {this.state.loggedIn} component={Test}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Start/>, document.getElementById('demo'));


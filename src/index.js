import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Importing CSS files
import './index.css';

// Importing components
import App from './App';
import FacebookButton from './components/facebookButton';

console.log("Running index.js right now");

// ReactDOM.render(<FacebookButton/>, document.getElementById('root'));


const responseFacebook = (response) => {
  console.log(response);
}

class Base extends Component {
  render() {
    return (
      <div>
        <Link to="/dummy">Route to dummy page</Link>
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

class Dummy extends Component {
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>
          This is just a dummy page to test the button<br />
          <a href="https://github.com/keppelen/react-facebook-login/pull/76#issuecomment-262098946">
          survives back and forth routing</a>
        </h1>
      </div>
    );
  }
}


class Start extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route path="/" component={Base}/>
          <Route path="/dummy" component={Dummy}/>
        </div>
      </Router>
    )
  }
}


ReactDOM.render(<Start/>, document.getElementById('demo'));


import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookButton extends Component {
  responseFacebook(response) {
    console.log("new response location is: ", response);
    console.log("this is: ", this);
    localStorage.setItem("loggedIn", true);
    this.props.onChangeLoginStatus(true);
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="1830088130643938"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook.bind(this)}
          icon="fa-facebook"/>
      </div>
    );
  }
}

import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookButton extends Component {
  responseFacebook(response) {
    console.log("new response location is: ", response);
    //console.log("this inside responseFacebook is: ", this);
    //Get session token from Koin server
    //Get current bixi data to display on map

    var fbAccessToken =response.accessToken
    console.log("fbAccessToken is: ", fbAccessToken);
    
    $.ajax({
      url: "http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/merchant/auth/facebook",
      type: "post",
      dataType: "json",
      data: {
        access_token: fbAccessToken
      },
      success: function (data){
        console.log("Success received back is: ", data);
      },
      error: function(error){
        console.log("Error received back is: ", error);
      }
    }); 

    localStorage.setItem("loggedIn", true);
    this.props.onChangeLoginStatus(true);
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="1706534352977056" //Mine - 1830088130643938, Koin - 1706534352977056
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook.bind(this)}
          icon="fa-facebook"/>
      </div>
    );
  }
}

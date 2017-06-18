import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookButton extends Component {

  // Handle response from user when he decides to login
  responseFacebook(response) {
    var fbAccessToken = response.accessToken
    console.log("fbAccessToken is: ", fbAccessToken);

    //Requesting session token from Koin server
    var data = JSON.stringify({
      "access_token": fbAccessToken
    });
    console.log("data to send to Koin server is: ", data);
    var url = 'http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/merchant/auth/facebook';
    var request = new Request(url, {
      method: 'POST',
      body: data,
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    var thisContext = this; // To keep track of this context within promise callback
    fetch(request)
    .then(
        function(response) {
          if (response.status !== 200) {   
            console.log('Looks like there was a problem. Status Code: ' +  response.status);  
            return;  
          }
          // Examine the text in the response from Koin server
          response.json().then(function(data) {  
            console.log("data from server is: ", data);
            var koinToken = data["session_token"]
            localStorage.setItem("koinToken", koinToken);
            console.log("thisContext is: ", thisContext);
            thisContext.props.onChangeLoginStatus(koinToken);
          });
        });
    console.log("After promise section.");
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

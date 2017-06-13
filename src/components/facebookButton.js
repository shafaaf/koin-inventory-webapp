import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookButton extends Component {
  responseFacebook(response) {
    console.log("response from Facebook is: ", response);
    var fbAccessToken =response.accessToken
    console.log("fbAccessToken is: ", fbAccessToken);

    //Requesting session token from Koin server
    var data = JSON.stringify({
      "access_token": fbAccessToken
    });
    console.log("data to send is: ", data);
    var request = new Request('http://custom-env-1.2tfxydg93p.us-west-2.elasticbeanstalk.com/api/v1/merchant/auth/facebook', {
      method: 'POST',
      body: data,
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request)
    .then(
        function(response) {
          if (response.status !== 200) {   
            console.log('Looks like there was a problem. Status Code: ' +  response.status);  
            return;  
          }
          // Examine the text in the response  
          response.json().then(function(data) {  
            console.log("data from server is: ", data);  
          });
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

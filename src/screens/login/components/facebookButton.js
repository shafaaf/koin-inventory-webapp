import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types'; // ES6 

export default class FacebookButton extends Component {
  // Handle response from user when he decides to login
  responseFacebook(facebookResponse) {
    console.log("responseFacebook: facebookResponse is: ", facebookResponse);
    var fbAccessToken = facebookResponse.accessToken
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
    fetch(request)
      .then( response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
          console.log("So removing old access token if exists");
          if (typeof(Storage) !== 'undefined') { // Check browser support
            if (localStorage.getItem("koinToken")){ // See if old one exists and remove if there.
              var koinToken = localStorage.getItem("koinToken");
              console.log("old koinToken exists and is: ", koinToken);
              localStorage.removeItem("koinToken");
              console.log("Removed old koinToken.");
            }
            else{
              console.log("Old Koin token was not there to delete");
            }
          }
          else{
            alert("Browser does not support local storage.");
            console.log("Sorry, your browser does not support Web Storage...");
          }
          return;  
        }
        response.json()  // Store and return koin token and facebook access tokens
          .then(data => {
            console.log("data from server is: ", data);
            var koinToken = data["session_token"];
            localStorage.setItem("koinToken", koinToken);
            var facebookToken = {};
            facebookToken["accessToken"] = facebookResponse["accessToken"];
            facebookToken["expiresIn"] = facebookResponse["expiresIn"];
            localStorage.setItem("facebookAccessToken", JSON.stringify(facebookToken));
            console.log("koinToken is: ", koinToken);
            console.log("facebookResponse is: ", facebookResponse);
            this.props.onChangeLoginStatus(koinToken, facebookResponse["accessToken"]);
          })
      })
      .catch(function(err) {
        alert("Problem in getting koin access token. err is: ", err);
        console.log("responseFacebook: err is: ", err);
      })
    console.log("After promise section.");
  }

  render() {
    return (
      console.log("Rendering facebookButon.");
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

FacebookButton.propTypes = {
    onChangeLoginStatus: PropTypes.func.isRequired
}

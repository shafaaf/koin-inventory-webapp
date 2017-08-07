import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types'; // ES6 

const FacebookButton = props =>
    <div>
        <FacebookLogin
            appId="1706534352977056" //Mine - 1830088130643938, Koin - 1706534352977056
            autoLoad={false}
            fields="name,email,picture"
            callback={props.responseFacebook}
            icon="fa-facebook"/>
    </div>

FacebookButton.propTypes = {
    responseFacebook: PropTypes.func.isRequired
}

export default FacebookButton;

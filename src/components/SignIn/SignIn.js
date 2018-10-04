import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SignIn.css';

function SignIn(props) {
  let currentLocation = window.location.href;
  console.log(currentLocation);

  function login() {
    let redirect_uri = encodeURIComponent(currentLocation);
    let request =  'https://accounts.spotify.com/authorize?response_type=token&client_id=' + process.env.REACT_APP_CLIENT_ID + '&redirect_uri=' + redirect_uri + '&scope=user-top-read';
    window.location = request;
  }

  if (props.state.userToken !== '') {
    return(
      <div className="bubble3">
        <Link className="linkStyle" to="/game" onClick={() => {props.gameStart();}}><h1 className="linkStyle">START GAME</h1></Link>
      </div>
    );
  } else {
    return(
      <div className="bubble3">
        <h1 className="linkStyle" onClick={() => {login()}}>CLICK HERE TO SCAN MY SPOTIFY LIBRARY</h1>
      </div>
    )
  }
}

SignIn.propTypes = {
  gameStart: PropTypes.func,
  scrapeUserData: PropTypes.func,
  state: PropTypes.object,
  grabUserToken: PropTypes.func
}

export default SignIn;

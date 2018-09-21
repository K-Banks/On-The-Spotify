import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SignIn.css';

function SignIn(props) {
  let _token = null;

  function handleNewTokenSubmission(event){
    event.preventDefault();
    if (_token.value !== '' && _token.value.length > 150) {
      props.grabUserToken(_token.value);
      props.scrapeUserData();
    } else {
      _token.value = 'Please use valid token';
    }
  }

  function login(event) {
    event.preventDefault();
    window.location = 'https://accounts.spotify.com/authorize?response_type=token&client_id=e0798695220f4b1296dc84f83a2c201c&redirect_uri=http:%2F%2Flocalhost:3000%2F&scope=user-top-read';
  }

  function printLocation() {
    let location = window.location.href;
    console.log(location);
    if (location.includes('#')) {
      console.log('theres an access token');
    } else {
      console.log('no access token');
    }
  }

  if (props.state.userToken !== '') {
    return(
      <div className="bubble3">
        <Link className="linkStyle" to="/game" onClick={() => {props.gameStart();}}>START A GAME!</Link>
      </div>
    );
  } else {
    return(
      <div className="bubbleSignIn">
        <form onSubmit={login} className="formStyle">
          <input
            type='text'
            id='token'
            placeholder='Enter token string here'
            ref={(input) => {_token = input;}}
          />
          <br></br>
          <button type='submit'>Get my data!</button>
        </form>
        <button type='button' onClick={() => {printLocation()}}>Print location</button>
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

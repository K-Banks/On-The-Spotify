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
    window.location = 'https://accounts.spotify.com/authorize?client_id=e0798695220f4b1296dc84f83a2c201c&redirect_uri=http:%2F%2Flocalhost:3000%2F?#%2F&scope=user-top-read&response_type=token';
    // let url = 'https://accounts.spotify.com/authorize';
    // fetch(url, {
    //   method: "GET",
    //   mode: 'cors',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "client_id": "e0798695220f4b1296dc84f83a2c201c",
    //     "response_type": "token",
    //     "redirect_uri": "http://localhost:3000/?#/",
    //     "scope": "user-top-read",
    //   }
    // }).then(
    //   response => response.json()
    // ).then(
    //   console.log("ping")
    // )
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

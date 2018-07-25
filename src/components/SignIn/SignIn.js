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

  if (props.state.userToken !== '') {
    return(
      <div className="bubble">
        <Link to="/game" onClick={() => {props.gameStart();}}>START A GAME!</Link>
      </div>
    );
  } else {
    return(
      <div className="bubble">
        <form onSubmit={handleNewTokenSubmission}>
          <input
            type='text'
            id='token'
            placeholder='Enter token string here'
            ref={(input) => {_token = input;}}
          />
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

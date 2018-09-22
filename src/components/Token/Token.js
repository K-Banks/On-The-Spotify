import React from 'react';
import PropTypes from 'prop-types';

function Token(props) {
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

SignIn.propTypes = {
  gameStart: PropTypes.func,
  scrapeUserData: PropTypes.func,
  state: PropTypes.object,
  grabUserToken: PropTypes.func
}

export default SignIn;

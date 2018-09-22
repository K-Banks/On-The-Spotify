import React from 'react';
import PropTypes from 'prop-types';

function printLocation() {
  let location = window.location.href;
  console.log(location);
}

function Token(props) {
  return(
    <div className="bubbleSignIn">
      <button type='button' onClick={() => {printLocation()}}>Print location</button>
    </div>
  )
}

Token.propTypes = {
  state: PropTypes.object,
  grabUserToken: PropTypes.func
}

export default Token;

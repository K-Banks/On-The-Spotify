import React from 'react';
import PropTypes from 'prop-types';

function Token(props) {
  function printLocation() {
    let location = window.location.href;
    console.log(location);
    let startSlice = (location.indexOf("=") + 1);
    console.log('start slice at ' + startSlice);
    let endSlice = location.indexOf("&");
    console.log('end slice at ' + endSlice);
    let accessToken = location.slice(startSlice, endSlice);
    console.log('access token is ' + accessToken);
    props.grabUserToken(accessToken);
    console.log(props.state);
  }

  function startGame(){
    let location = window.location.href;
    let sliceIndex = location.indexOf('access_token');
    console.log(sliceIndex);
    let baseURL = location.slice(0,sliceIndex);
    console.log('base url ' + baseURL);
    let redirectURL = baseURL + 'game';
    window.location = redirectURL;
  }

  return(
    <div className="bubbleSignIn">
      <button type='button' onClick={() => {printLocation()}}>Print location</button>
      <button type='button' onClick={() => {startGame()}}>Start</button>
    </div>
  )
}

Token.propTypes = {
  state: PropTypes.object,
  grabUserToken: PropTypes.func
}

export default Token;

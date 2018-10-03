import React from 'react';
import PropTypes from 'prop-types';
import './ErrorComponent.css';

function ErrorComponent(){

  function goHome() {
    window.location = '/';
  }

  return(
    <div class='errorComponent'>
      <div>
        <h1>PAGE NOT FOUND</h1>
        <br/>
        <h3 class='bubbleButton' onClick={() => {goHome()}}>click here to return to home</h3>
      </div>
    </div>
  )
}

  ErrorComponent.propTypes = {}

export default ErrorComponent;

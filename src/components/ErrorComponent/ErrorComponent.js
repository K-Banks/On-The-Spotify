import React from 'react';
import PropTypes from 'prop-types';
import './ErrorComponent.css';

function ErrorComponent(props){

  function goHome() {
    props.resetResponseError();
    window.location = '/';
  }

  if (props.responseError.status) {
    console.log('Response error: ' + props.responseError.status);
    console.log('Information: ' + props.responseError.message);
    return(
      <div className='errorComponent'>
        <div>
          <br/>
          <h1>Oops, something went wrong with the app.</h1>
          <br/>
          <h2>Error retrieving data: {props.responseError.status}</h2>
          <p>Further information: {props.responseError.statusText}</p>
          <br/>
          <h3 className='bubbleButton' onClick={() => {goHome()}}>Click here to try again.</h3>
        </div>
      </div>
    )
  }
  return(
    <div className='errorComponent'>
      <div>
        <h1>PAGE NOT FOUND</h1>
        <br/>
        <h3 className='bubbleButton' onClick={() => {goHome()}}>click here to return to home</h3>
      </div>
    </div>
  )
}

  ErrorComponent.propTypes = {
    responseError: PropTypes.object,
    resetResponseError: PropTypes.func
  }

export default ErrorComponent;

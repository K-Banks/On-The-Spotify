import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TestForm(props) {

  return(
    <div>
        <Link to="/game" onClick={() => {props.gameStart();}}>START A GAME!</Link>
    </div>
  );
}

TestForm.propTypes = {
  gameStart: PropTypes.func
}

export default TestForm;

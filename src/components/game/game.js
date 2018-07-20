import React from 'react';
import PropTypes from 'prop-types';

function Game(props){
  function logState() {
    console.log(props.state);
    console.log(props.state.roundAnswers);
  };

  return(
    <div>
      <h1>THIS IS WORKING</h1>
      <button onClick={() => {logState();}}>Press button to print state to console.</button>
      {props.state.roundAnswers.map((artist, key) =>
        <p key={key}>{artist}</p>
      )}
    </div>
  );
}

  Game.propTypes = {
    state: PropTypes.object,
    roundAnswers: PropTypes.array
  }

export default Game;

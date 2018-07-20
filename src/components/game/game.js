import React from 'react';
import PropTypes from 'prop-types';

function Game(props) {
    let randomizedAnswers = [];

    function logState() {
      console.log(props.state);
    };

  return(
    <div>
      <h1>THIS IS WORKING</h1>
      <button onClick={() => {logState();}}>Press button to print state to console.</button>
      <p>{props.state.gameData.songData[props.state.currentRound].artistName}</p>
      {props.state.gameData.wrongArtistNames[props.state.currentRound].map((artist, key) =>
        <p key={key}>{artist}</p>
      )}
    </div>
  );
}

  Game.propTypes = {
    state: PropTypes.object
  }

export default Game;

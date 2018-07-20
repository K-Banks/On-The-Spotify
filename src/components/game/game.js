import React from 'react';
import PropTypes from 'prop-types';

function Game(props){
  function logState() {
    console.log(props.state);
    console.log(props.state.roundAnswers);
    console.log(props.state.gameData.songData[props.state.currentRound].trackAudio);
  };

  function checkAnswer(artist) {
    console.log('checking answer');
    console.log(artist);
    if (artist === props.state.gameData.songData[props.state.currentRound].artistName) {
      console.log('You are correct');
    } else {
      console.log("Sorry, that's not right");
    }
  }

  return(
    <div>
      <h1>Which artist wrote this song?</h1>
      <button onClick={() => {logState();}}>Press button to print state to console.</button>
      {props.state.roundAnswers.map((artist, key) =>
        <p key={key} onClick={() => {checkAnswer(artist)}}>{artist}</p>
      )}
      <audio controls>
        <source src={props.state.gameData.songData[props.state.currentRound].trackAudio} type="audio/mpeg">
      </audio>
    </div>
  );
}

  Game.propTypes = {
    state: PropTypes.object,
    roundAnswers: PropTypes.array
  }

export default Game;

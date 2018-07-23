import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import RoundStart from './../RoundStart/RoundStart';
import GameState from './../GameState/GameState';

function Game(props){
  function logState() {
    console.log(props.state);
    console.log(props.state.roundAnswers);
    console.log(props.state.gameData.songData[props.state.currentRound].trackAudio);
  };

  function checkAnswer(artist) {
    if (artist === props.state.gameData.songData[props.state.currentRound].artistName) {
      props.stopTimer(true);
    } else {
      props.stopTimer();
    }
  }

  if (props.state.gameStatus === false) {
    return(
      <GameState />
    );
  } else if (props.state.roundStart) {
    return(
      <div>
        <h1>Which artist wrote this song?</h1>
        <button onClick={() => {logState();}}>Press button to print state to console.</button>
        {props.state.roundAnswers.map((artist, key) =>
          <p key={key} onClick={() => {checkAnswer(artist)}}>{artist}</p>
        )}
        <ReactAudioPlayer
          src={props.state.gameData.songData[props.state.currentRound].trackAudio}
          autoPlay
        />
      </div>
    );
  } else {
    return(
      <RoundStart state={props.state} toggleRoundStart={props.toggleRoundStart}/>
    );
  }
}

  Game.propTypes = {
    state: PropTypes.object,
    roundAnswers: PropTypes.array,
    startTimer: PropTypes.func,
    stopTimer: PropTypes.func,
    toggleRoundStart: PropTypes.func
  }

export default Game;

import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import RoundStart from './../RoundStart/RoundStart';
import GameState from './../GameState/GameState';

function Game(props){
  function logState() {
    console.log(props.state);
  };

  function checkAnswer(artist) {
    if (artist === props.state.gameData.songData.artistName) {
      props.endRound(true);
    } else {
      props.endRound();
    }
  }

  if (props.state.gameData.gameStatus && props.state.gameData.roundStart) {
    return(
      <GameState />
    );
  } else if (props.state.gameData.roundStart) {
    return(
      <div>
        <h1>Which artist wrote this song?</h1>
        <h2>Time remaining: {props.state.timeRemaining}</h2>
        <button onClick={() => {logState();}}>Press button to print state to console.</button>
        {props.state.gameData.roundAnswers.map((artist, key) =>
          <p key={key} onClick={() => {checkAnswer(artist)}}>{artist}</p>
        )}
        <ReactAudioPlayer
          src={props.state.gameData.songData.trackAudio}
          autoPlay
        />
      </div>
    );
  } else if (props.state.gameData.gameStatus === false) {
    return(
      <GameState/>
    );
  } else {
    return(
      <RoundStart state={props.state} toggleRoundStart={props.toggleRoundStart}/>
    );
  }
}

  Game.propTypes = {
    state: PropTypes.object,
    endRound: PropTypes.func,
    toggleRoundStart: PropTypes.func
  }

export default Game;

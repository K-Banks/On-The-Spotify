import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import RoundStart from './../RoundStart/RoundStart';
import GameState from './../GameState/GameState';
import EndGame from './../EndGame/EndGame';
import './game.css';
import Scoreboard from './../Scoreboard/Scoreboard';

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
      <div>
        <h1>Which artist wrote this song?</h1>
        <h2>Time remaining: {props.state.timeRemaining}</h2>
        <Scoreboard state={props.state}/>
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
  } else if (props.state.gameData.gameStatus && props.state.gameData.roundStart === false) {
    return(
      <div>
        <button onClick={() => {logState();}}>Press button to print state to console.</button>
        <RoundStart state={props.state} toggleRoundStart={props.toggleRoundStart}/>
        <Scoreboard state={props.state}/>
      </div>
    );
  } else if (props.state.gameData.gameStatus===false && props.state.gameResults.length>=5) {
      return(
        <div>
          <button onClick={() => {logState();}}>Press button to print state to console.</button>
          <EndGame state={props.state} restartGame={props.restartGame}/>
          <Scoreboard state={props.state}/>
        </div>
      );
  } else {
    return(
      <div>
        <GameState/>
      </div>
    );
  }
}

  Game.propTypes = {
    state: PropTypes.object,
    endRound: PropTypes.func,
    toggleRoundStart: PropTypes.func,
    restartGame: PropTypes.func
  }

export default Game;

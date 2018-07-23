import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';

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
      props.stopTimer(true);
    } else {
      console.log("Sorry, that's not right");
      props.stopTimer();
    }
  }

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
      <div>
        <h4>Round Results: </h4>
        {props.state.gameResults.answerPoints.map((points, key) =>
        <p key={key}>You earned this many points: {points}</p>
        )}
      </div>
    </div>
  );
}

  Game.propTypes = {
    state: PropTypes.object,
    roundAnswers: PropTypes.array,
    startTimer: PropTypes.func,
    stopTimer: PropTypes.func
  }

export default Game;

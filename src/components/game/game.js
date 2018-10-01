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
      <div className="spacer">
        <div className="game">
          <div className="gameSpace">
            <h1>Which artist wrote this song?</h1>
            <h2>Time remaining: {props.state.timeRemaining}</h2>
            {props.state.gameData.roundAnswers.map((artist, key) =>
              <div key={key} className="answerButtons">
                <p onClick={() => {checkAnswer(artist)}}>{artist}</p>
              </div>
            )}
            <ReactAudioPlayer
              src={props.state.gameData.songData.trackAudio}
              autoPlay
              />
          </div>
        </div>
        <div className="scoreboard">
          <Scoreboard state={props.state}/>
        </div>
      </div>
    );
  } else if (props.state.gameData.gameStatus === true && props.state.gameData.roundStart === false) {
    return(
      <div className="spacer">
        <div className="game">
          <RoundStart state={props.state} toggleRoundStart={props.toggleRoundStart}/>
        </div>
        <div className="scoreboard">
          <Scoreboard state={props.state}/>
        </div>
      </div>
    );
  } else if (props.state.gameData.gameStatus===false && props.state.gameResults.length>=10) {
      return(
        <div className="spacer">
          <div className="game">
            <EndGame state={props.state} restartGame={props.restartGame}/>
          </div>
          <div className="scoreboard">
            <Scoreboard state={props.state}/>
          </div>
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

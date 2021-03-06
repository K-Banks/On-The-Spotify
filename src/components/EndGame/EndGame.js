import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './EndGame.css';

function EndGame(props){
  let totalScore = 0;
  let maxScore = 30 * props.state.gameData.gameRounds;
  if (props.state.gameResults.length >= props.state.gameData.gameRounds) {
    for (var i = 0; i < props.state.gameResults.length; i++) {
      totalScore = props.state.gameResults[i].points + totalScore;
    }
  }


  return(
    <div className="endGameStyleContainer">
      <div className="endGameStyle">
        <h1>You scored <span className='spanStyle'>{totalScore}</span> points out of <span className='spanStyle'>{maxScore}</span></h1>
        <div className="homeLink">
          <Link className="linkStyle" onClick={()=>{props.restartGame()}} to='https://k-banks.github.io/On-The-Spotify/#/'>START NEW GAME</Link>
        </div>
      </div>
    </div>

  );
}

EndGame.propTypes={
  state: PropTypes.object,
  restartGame: PropTypes.func
}

export default EndGame;

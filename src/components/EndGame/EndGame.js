import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './EndGame.css';

function EndGame(props){
  let totalScore = 0;
  if (props.state.gameResults.length >= 5) {
    for (var i = 0; i < props.state.gameResults.length; i++) {
      totalScore = props.state.gameResults[i].points + totalScore;
    }
  }


  return(
    <div className="endGameStyle">
      <h1>You scored {totalScore} points out of 150</h1>
      <div className="homeLink">
        <Link className="linkStyle" onClick={()=>{props.restartGame();}} to='/'>Home</Link>
      </div>
    </div>

  );
}

EndGame.propTypes={
  state: PropTypes.object,
  restartGame: PropTypes.func
}

export default EndGame;

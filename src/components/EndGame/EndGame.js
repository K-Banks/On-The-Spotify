import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function EndGame(props){
  let totalScore = 0;
  if (props.state.gameResults.length >= 5) {
    for (var i = 0; i < props.state.gameResults.length; i++) {
      totalScore = props.state.gameResults[i].points + totalScore;
    }
  }


  return(
    <div>
      <h1>This is the end game screen</h1>
      <h3>You scored {totalScore} points out of 150</h3>
      <Link onClick={()=>{props.restartGame();}} to='/'>Home</Link>
    </div>

  );
}

EndGame.propTypes={
  state: PropTypes.object,
  restartGame: PropTypes.func
}

export default EndGame;

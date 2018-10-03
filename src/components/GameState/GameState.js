import React from 'react';
import {Link} from 'react-router-dom';
import './GameState.css';

function GameState(){
  return(
    <div className="bubble2">
      <Link className="linkStyle" to="/">RESTART GAME</Link>
    </div>
  )
}

export default GameState;

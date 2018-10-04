import React from 'react';
import {Link} from 'react-router-dom';
import './GameState.css';

function GameState(){
  function navigateHome() {
    window.location = '/';
  }

  return(
    <div className="bubble2" onClick={()=>navigateHome()}>
      <h1>RESTART GAME</h1>
    </div>
  )
}

export default GameState;

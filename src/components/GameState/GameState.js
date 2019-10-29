import React from 'react';
import './GameState.css';

function GameState(){
  function navigateHome() {
    window.location = 'https://k-banks.github.io/On-The-Spotify/#/';
  }

  return(
    <div className="bubble2" onClick={()=>navigateHome()}>
      <h1>RESTART GAME</h1>
    </div>
  )
}

export default GameState;

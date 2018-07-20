import React from 'react';

function Game() {

    function logState() {
      console.log('You want state?');
    };

  return(
    <div>
      <h1>THIS IS WORKING</h1>
      <button onClick={() => {logState();}}>Press button to print state to console.</button>
    </div>
  );
}

export default Game;

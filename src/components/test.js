import React from 'react';

function Test(){
  let object;

  function logger() {
    console.log('you clicked the test');
  }

  return(
    <div>
      <h1>Test Component working</h1>
      <button onClick={()=> {logger()}}>Log me</button>
    </div>
  )
}

export default Test;

import React from 'react';
import PropTypes from 'prop-types';
import './RoundStart.css';

function RoundStart(props){
  if (props.state.gameData.roundStatus) {
    return(
      <div className="roundStartStyle" onClick={()=>{props.toggleRoundStart();}}>
        <h1>READY TO START</h1>
      </div>
    );
  } else {
    return(
      <div>
        <h1>COLLECTING ROUND DATA</h1>
      </div>
    )
  }
}

RoundStart.propTypes = {
  state: PropTypes.object
}

export default RoundStart;

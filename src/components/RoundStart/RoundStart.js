import React from 'react';
import PropTypes from 'prop-types';
import './RoundStart.css';

function RoundStart(props){
  if (props.state.gameData.roundStatus) {
    return(
      <div className="roundStartStyle" onClick={()=>{props.toggleRoundStart();}}>
        <h1>READY TO START ROUND</h1>
      </div>
    );
  } else {
    return(
      <div className="roundCollectionStyle">
        <h1>COLLECTING DATA FOR NEXT ROUND</h1>
      </div>
    )
  }
}

RoundStart.propTypes = {
  state: PropTypes.object
}

export default RoundStart;

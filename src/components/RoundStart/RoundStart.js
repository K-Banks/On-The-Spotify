import React from 'react';
import PropTypes from 'prop-types';

function RoundStart(props){
    return(
      <div>
        <h1 onClick={()=>{props.toggleRoundStart();}}>READY TO START</h1>
      </div>
    );
}

RoundStart.propTypes = {
  state: PropTypes.object
}

export default RoundStart;

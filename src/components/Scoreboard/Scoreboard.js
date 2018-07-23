import React from 'react';
import PropTypes from 'prop-types';

function Scoreboard(props) {
  return(
    <div>
      <h3>This is the scoreboard</h3>
      <p>{props.state.roundAnswers}</p>
    </div>
  );
}

Scoreboard.propTypes = {
  state: PropTypes.object
}

export default Scoreboard;

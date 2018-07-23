import React from 'react';
import PropTypes from 'prop-types';

function Scoreboard(props) {
  return(
    <div>
      <h3>This is the scoreboard</h3>
      {props.state.gameResults.map((results, key) =>
        <ul key={key}>
          <li>Artist: {results.artist}</li>
          <li>Track: {results.track}</li>
          <li>Correct: {results.answerString}</li>
          <li>Points: {results.points}</li>
        </ul>
      )}
    </div>
  );
}

Scoreboard.propTypes = {
  state: PropTypes.object
}

export default Scoreboard;

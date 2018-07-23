import React from 'react';
import PropTypes from 'prop-types';

function Scoreboard(props) {
  return(
    <div>
      <h3>This is the scoreboard</h3>
      <table>
        <tr>
          <th>Artist Name</th>
          <th>Track Name</th>
          <th>Points</th>
          <th>Answer</th>
        </tr>
        {props.state.gameResults.map((results, key) =>
          <tr key={key}>
            <td>{results.artist}</td>
            <td>{results.track}</td>
            <td>{results.points}</td>
            <td>{results.answerString}</td>
          </tr>
        )}
      </table>
    </div>
  );
}

Scoreboard.propTypes = {
  state: PropTypes.object
}

export default Scoreboard;

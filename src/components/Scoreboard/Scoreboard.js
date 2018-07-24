import React from 'react';
import PropTypes from 'prop-types';

function Scoreboard(props) {
  return(
    <div>
      <table>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
}

Scoreboard.propTypes = {
  state: PropTypes.object
}

export default Scoreboard;

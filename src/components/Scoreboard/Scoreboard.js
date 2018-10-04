import React from 'react';
import PropTypes from 'prop-types';
import './Scoreboard.css';

function Scoreboard(props) {
  return(
    <div id="scoreboardBackground">
      <table cellSpacing="0">
        <tbody>
          <tr>
            <th id="tableArtist">Artist</th>
            <th id="tableTrack">Track</th>
            <th id="tablePoints">Points</th>
            <th id="tableAnswer">Answer</th>
          </tr>
          {props.state.gameResults.map((results, key) =>
            <tr key={key}>
              <td>{results.artist}</td>
              <td>{results.track}</td>
              <td className="centerStyle">{results.points}</td>
              <td className="centerStyle">{results.answerString}</td>
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

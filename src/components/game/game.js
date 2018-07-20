import React from 'react';
import PropTypes from 'prop-types';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.randomizedAnswersArray=[];
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
  }

  didComponentMount() {
    this.randomizeAnswers();
  }

  randomizeAnswers() {
    let answer1 = this.props.state.gameData.songData[this.props.state.currentRound].artistName;
    let answer2 = this.props.state.gameData.wrongArtistNames[this.props.state.currentRound][0];
    let answer3 = this.props.state.gameData.wrongArtistNames[this.props.state.currentRound][1];
    let answer4 = this.props.state.gameData.wrongArtistNames[this.props.state.currentRound][2];
    const answerArray = [answer1, answer2, answer3, answer4];
    // DEBUG:
    while (this.randomizedAnswersArray.length < 4) {
      let selection = Math.floor(Math.random() * 4);
      if (this.randomizedAnswersArray.includes(answerArray[selection]) === false) {
        this.randomizedAnswersArray.push(answerArray[selection]);
      }
    }
    console.log(this.randomizedAnswersArray);
  };

  logState() {
    console.log(this.props.state);
  };

  render(){
    return(
      <div>
        <h1>THIS IS WORKING</h1>
        <button onClick={() => {this.logState();}}>Press button to print state to console.</button>
        {this.randomizedAnswersArray.map((artist, key) =>
          <p key={key}>{artist}</p>
        )}
      </div>
    );
  }
}

  Game.propTypes = {
    state: PropTypes.object
  }

export default Game;

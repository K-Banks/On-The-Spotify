import React from 'react';
import './App.css';
import TestForm from './components/testForm';
import { Switch, Route, Link } from 'react-router-dom';
import Game from './components/game/game';
import {initialState} from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.timer = 0;
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetRoundTimer = this.resetRoundTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.addRoundAnswer = this.addRoundAnswer.bind(this);
    this.goToNextRound = this.goToNextRound.bind(this);
  };

  componentDidMount() {
    this.randomizeAnswers();
  };

  resetRoundTimer() {
    let reset = this.state;
    reset.timeRemaining = 30;
    this.setState(reset);
  };

  startTimer() {
    this.resetRoundTimer();
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  stopTimer(boolean) {
    this.addRoundAnswer(boolean);
    clearInterval(this.timer);
    this.timer = 0;
    this.goToNextRound();
  }

  addRoundAnswer(boolean) {
    let newState = this.state;
    let score;
    let rightWrong;
    if (boolean === true) {
      score = this.state.timeRemaining;
      rightWrong = 'Correct';
    } else {
      score = 0;
      rightWrong = 'Wrong';
    }
    let roundData = {
      artist: newState.gameData.songData[newState.currentRound].artistName,
      track: newState.gameData.songData[newState.currentRound].trackName,
      correct: boolean,
      points: score,
      answerString: rightWrong
    }
    newState.gameResults.push(roundData);
    this.setState(newState);
  }

  goToNextRound() {
    let newState = this.state;
    newState.currentRound = newState.currentRound + 1;
    if (newState.currentRound >= 10) {
      this.setState(newState);
    }
    this.startTimer();
    this.randomizeAnswers();
  }

  countDown() {
    let seconds = this.state;
    seconds.timeRemaining = seconds.timeRemaining - 1;
    this.setState(seconds);
    if (seconds.timeRemaining === 0) {
      clearInterval(this.timer);
    }
  }

  randomizeAnswers() {
    let randomizedAnswersArray = [];
    let answer1 = this.state.gameData.songData[this.state.currentRound].artistName;
    let answer2 = this.state.gameData.wrongArtistNames[this.state.currentRound][0];
    let answer3 = this.state.gameData.wrongArtistNames[this.state.currentRound][1];
    let answer4 = this.state.gameData.wrongArtistNames[this.state.currentRound][2];
    const answerArray = [answer1, answer2, answer3, answer4];
    while (randomizedAnswersArray.length < 4) {
      let selection = Math.floor(Math.random() * 4);
      if (randomizedAnswersArray.includes(answerArray[selection]) === false) {
        randomizedAnswersArray.push(answerArray[selection]);
      }
    }
    let newState = Object.assign({}, this.state);
    newState.roundAnswers = randomizedAnswersArray;
    this.setState(newState);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to On-The-Spotify</h1>
          <Link to='/'>Home</Link>
        </header>
        <h2>Time remaining: {this.state.timeRemaining}</h2>
        <Switch>
          <Route exact path='/' render={()=><TestForm startTimer={this.startTimer}/>} />
          <Route path="/game" render={()=><Game state={this.state} stopTimer={this.stopTimer} roundAnswers={this.roundAnswers} startTimer={this.startTimer}/>} />
        </Switch>
      </div>
    );
  }
}


export default App;

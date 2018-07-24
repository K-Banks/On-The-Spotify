import React from 'react';
import './App.css';
import TestForm from './components/testForm';
import { Switch, Route, Link } from 'react-router-dom';
import Game from './components/game/game';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Test from './components/test';
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
    this.toggleRoundStart = this.toggleRoundStart.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.endGame = this.endGame.bind(this);
  };
//refactor for round
  componentDidMount() {
    this.randomizeAnswers();
  };
//refactor for round
  resetRoundTimer() {
    let reset = this.state;
    reset.timeRemaining = 30;
    this.setState(reset);
  };
//refactor for round
  startTimer() {
    this.resetRoundTimer();
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
//refactor for round
  stopTimer(boolean) {
    this.addRoundAnswer(boolean);
    clearInterval(this.timer);
    this.timer = 0;
  }
//refactor for round
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
    this.toggleRoundStart();
  }
//refactor for round
  goToNextRound() {
    let newState = this.state;
    newState.currentRound = newState.currentRound + 1;
    this.setState(newState);
    this.startTimer();
    this.randomizeAnswers();
  };
//refactor for round
  endGame() {
    let game = this.state;
    game.gameStatus = false;
    this.setState(game);
  };
//refactor for round
  countDown() {
    let seconds = this.state;
    seconds.timeRemaining = seconds.timeRemaining - 1;
    this.setState(seconds);
    if (seconds.timeRemaining === 0) {
      clearInterval(this.timer);
    }
  }
//refactor for round
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
//refactor for round
  toggleRoundStart() {
    let toggle = this.state;
    if (toggle.roundStart) {
      toggle.roundStart = false;
      this.setState(toggle);
    } else {
      toggle.roundStart = true;
      this.setState(toggle);
      this.goToNextRound();
    }
  }
//refactor for round
  gameStart(){
    let game = this.state;
    game.gameStatus = true;
    game.roundStart = true;
    this.setState(game);
    this.startTimer();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to On-The-Spotify</h1>
          <Link to='/'>Home</Link>
        </header>
        <Switch>
          <Route exact path='/' render={()=><TestForm gameStart={this.gameStart} state={this.state}/>} />
          <Route path="/game" render={()=><Game state={this.state} stopTimer={this.stopTimer} roundAnswers={this.roundAnswers} startTimer={this.startTimer} toggleRoundStart={this.toggleRoundStart} endGame={this.endGame}/>} />
          <Route path="/test" render={()=><Test/>}/>
        </Switch>
        <Scoreboard state={this.state}/>
      </div>
    );
  }
}


export default App;

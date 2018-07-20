import React from 'react';
import './App.css';
import TestForm from './components/testForm';
import { Switch, Route } from 'react-router-dom';
import Game from './components/game/game';
import {initialState} from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.roundAnswers = this.randomizeAnswers();
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
    console.log(randomizedAnswersArray);
    return randomizedAnswersArray;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to On-The-Spotify</h1>
        </header>
        <Switch>
          <Route exact path='/' render={()=><TestForm />} />
          <Route path="/game" render={()=><Game state={this.state} roundAnswers={this.roundAnswers}/>} />
        </Switch>
      </div>
    );
  }
}


export default App;

import React from 'react';
import './App.css';
import TestForm from './components/testForm';
import { Switch, Route, Link } from 'react-router-dom';
import Game from './components/game/game';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Test from './components/test';
import {roundState} from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = roundState;
    this.timer = 0;
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetRoundTimer = this.resetRoundTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.addRoundAnswer = this.addRoundAnswer.bind(this);
    this.startNextRound = this.startNextRound.bind(this);
    this.toggleRoundStart = this.toggleRoundStart.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.endGame = this.endGame.bind(this);
    this.scrapeUserData = this.scrapeUserData.bind(this);
    this.addUserArtists = this.addUserArtists.bind(this);
    this.getWrongArtists = this.getWrongArtists.bind(this);
    this.addWrongArtists = this.addWrongArtists.bind(this);
    this.getArtistAlbums = this.getArtistAlbums.bind(this);
    this.getRandomSong = this.getRandomSong.bind(this);
    this.addRandomSong = this.addRandomSong.bind(this);
    this.grabUserToken = this.grabUserToken.bind(this);
    this.prepRound = this.prepRound.bind(this);
  };

  grabUserToken(token) {
    let newState = this.state;
    newState.userToken = token;
    this.setState(newState);
  }

  scrapeUserData() {
    console.log('scraping data');
    const url = 'https://api.spotify.com/v1/me/top/artists';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        this.addUserArtists(data);
      }
    )
  }

  addUserArtists(data) {
    let roundState = this.state;
    while (roundState.gameData.answerArtistIds.length < 5) {
      let rng = Math.floor(Math.random() * 20);
      if (roundState.gameData.answerArtistIds.includes(data.items[rng].name)) {
      } else {
        roundState.gameData.answerArtistIds.push(data.items[rng].id);
      }
    }
    this.setState(roundState);
    console.log(this.state);
  }

  getWrongArtists() {
    let url = 'https://api.spotify.com/v1/artists/' + this.state.gameData.answerArtistIds[this.state.gameData.currentRound] + '/related-artists';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => response.json()
    ).then(
      artistData=>{
        this.addWrongArtists(artistData);
      }
    )
  }

  addWrongArtists(artistData) {
    let wrongArtistsArray = [];
    let roundState = this.state;
    while (wrongArtistsArray.length < 3) {
      let rng = Math.floor(Math.random() * 20);
      if (wrongArtistsArray.includes(artistData.artists[rng].name)) {
      } else {
        wrongArtistsArray.push(artistData.artists[rng].name);
      }
    }
    roundState.gameData.roundAnswers = wrongArtistsArray;
    this.setState(roundState);
  }

  getArtistAlbums() {
    console.log('getting albums');
    let roundState = this.state;
    const url = 'https://api.spotify.com/v1/artists/' + this.state.gameData.answerArtistIds[this.state.gameData.currentRound] + '/albums';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => response.json()
    ).then(
      albumData => {
        let numberOfAlbums = 0;
        console.log(albumData);
        for (var i = 0; i < albumData.items.length; i++) {
          if (albumData.items[i].album_type === "album") {
            numberOfAlbums += 1;
          }
        }
        console.log('number of albums is: ' + numberOfAlbums);
        roundState.gameData.songData.artistName = albumData.items[0].artists[0].name;
        this.setState(roundState);
        this.getRandomSong(albumData, numberOfAlbums);
      }
    )
  }

  getRandomSong(albumData, numberOfAlbums) {
    let rng = Math.floor(Math.random() * numberOfAlbums);
    let albumSelection = albumData.items[rng].id;
    console.log(albumSelection);
    const url = 'https://api.spotify.com/v1/albums/' + albumSelection + '/tracks';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => response.json()
    ).then(
      songData => {
        console.log('song data');
        console.log(songData);
        this.addRandomSong(songData);
      }
    )
  }

  addRandomSong(songData) {
    let roundState = this.state;
    let numberOfTracks = songData.items.length;
    let rng = Math.floor(Math.random() * numberOfTracks);
    roundState.gameData.songData.trackName = songData.items[rng].name;
    roundState.gameData.songData.trackAudio = songData.items[rng].preview_url;
    this.setState(roundState);
    console.log(roundState);
  }

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
      artist: newState.gameData.songData.artistName,
      track: newState.gameData.songData.trackName,
      correct: boolean,
      points: score,
      answerString: rightWrong
    }
    newState.gameResults.push(roundData);
    this.setState(newState);
    this.toggleRoundStart();
  }

  startNextRound() {
    this.startTimer();
    this.randomizeAnswers();
  };

  endGame() {
    let game = this.state;
    game.gameData.gameStatus = false;
    this.setState(game);
  };

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
    let answer1 = this.state.gameData.songData.artistName;
    let answer2 = this.state.gameData.roundAnswers[0];
    let answer3 = this.state.gameData.roundAnswers[1];
    let answer4 = this.state.gameData.roundAnswers[2];
    const answerArray = [answer1, answer2, answer3, answer4];
    while (randomizedAnswersArray.length < 4) {
      let selection = Math.floor(Math.random() * 4);
      if (randomizedAnswersArray.includes(answerArray[selection]) === false) {
        randomizedAnswersArray.push(answerArray[selection]);
      }
    }
    let newState = this.state;
    newState.gameData.roundAnswers = randomizedAnswersArray;
    this.setState(newState);
  };

  toggleRoundStart() {
    let toggle = this.state;
    if (toggle.gameData.roundStart) {
      toggle.gameData.roundStart = false;
      this.setState(toggle);
    } else {
      toggle.gameData.roundStart = true;
      this.setState(toggle);
      this.startNextRound();
    }
  }

  gameStart(){
    let game = this.state;
    game.gameData.gameStatus = true;
    this.setState(game);
    this.prepRound();
  }

  prepRound() {
    this.getWrongArtists();
    this.getArtistAlbums();
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
          <Route exact path='/' render={()=><TestForm grabUserToken={this.grabUserToken} gameStart={this.gameStart} state={this.state} scrapeUserData={this.scrapeUserData}/>} />
          <Route path="/game" render={()=><Game state={this.state} stopTimer={this.stopTimer} roundAnswers={this.roundAnswers} startTimer={this.startTimer} toggleRoundStart={this.toggleRoundStart} endGame={this.endGame}/>} />
          <Route path="/test" render={()=><Test/>}/>
        </Switch>
        <Scoreboard state={this.state}/>
      </div>
    );
  }
}


export default App;

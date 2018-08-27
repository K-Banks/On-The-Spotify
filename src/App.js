import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import { Switch, Route } from 'react-router-dom';
import Game from './components/game/game';
import Header from './components/Header/Header';
import { roundState } from './constants';

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
    this.endRound = this.endRound.bind(this);
    this.restartGame = this.restartGame.bind(this);
  };

  grabUserToken(token) {
    let newState = this.state;
    newState.userToken = token;
    this.setState(newState);
  }

  scrapeUserData() {
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
        this.addUserArtists(data);
      }
    )
  }

  addUserArtists(data) {
    let tempState = this.state;
    while (tempState.gameData.answerArtistIds.length < 5) {
      let rng = Math.floor(Math.random() * 20);
      if (tempState.gameData.answerArtistIds.includes(data.items[rng].id)) {
      } else {
        tempState.gameData.answerArtistIds.push(data.items[rng].id);
      }
    }
    this.setState(tempState);
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
    let tempState = this.state;
    while (wrongArtistsArray.length < 3) {
      let rng = Math.floor(Math.random() * 20);
      if (wrongArtistsArray.includes(artistData.artists[rng].name)) {
      } else {
        wrongArtistsArray.push(artistData.artists[rng].name);
      }
    }
    tempState.gameData.roundAnswers = wrongArtistsArray;
    this.setState(tempState);
  }

  getArtistAlbums() {
    let tempState = this.state;
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
        for (var i = 0; i < albumData.items.length; i++) {
          if (albumData.items[i].album_type === "album") {
            numberOfAlbums += 1;
          }
        }
        tempState.gameData.songData.artistName = albumData.items[0].artists[0].name;
        this.setState(tempState);
        this.getRandomSong(albumData, numberOfAlbums);
      }
    )
  }

  getRandomSong(albumData, numberOfAlbums) {
    let rng = Math.floor(Math.random() * numberOfAlbums);
    let albumSelection = albumData.items[rng].id;
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
        this.addRandomSong(songData);
      }
    )
  }

  addRandomSong(songData) {
    let numberOfTracks = songData.items.length;
    let rng = Math.floor(Math.random() * numberOfTracks);
    if (songData.items[rng].preview_url) {
      let tempState = this.state;
      tempState.gameData.songData.trackName = songData.items[rng].name;
      tempState.gameData.songData.trackAudio = songData.items[rng].preview_url;
      this.setState(tempState);
    } else {
      this.getArtistAlbums();
    }
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

  stopTimer() {
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
  }

  startNextRound() {
    this.startTimer();
    this.randomizeAnswers();
  };

  endGame() {
    let end = this.state;
    end.gameData.gameStatus = false;
    this.setState(end);
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

  advanceCurrentRound() {
    let newRound = this.state;
    newRound.gameData.currentRound += 1;
    this.setState(newRound);
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

  endRound(boolean) {
    this.stopTimer();
    this.addRoundAnswer(boolean);
    this.advanceCurrentRound();
    if (this.state.gameData.currentRound >= 5) {
      this.endGame();
    } else {
      this.toggleRoundStart();
      this.prepRound();
    }
  }

  restartGame() {
    const freshState = {
      timeRemaining: 0,
      userToken: '',
      gameResults: [],
      gameData: {
        answerArtistIds: [],
        songData: {
          artistName: '',
          trackName: '',
          trackAudio: ''
        },
        roundAnswers: [],
        gameStatus: false,
        roundStart: false,
        currentRound: 0
      },
    };
    this.setState(freshState);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><SignIn grabUserToken={this.grabUserToken} gameStart={this.gameStart} state={this.state} scrapeUserData={this.scrapeUserData}/>} />
          <Route path="/game" render={()=><Game state={this.state} endRound={this.endRound} toggleRoundStart={this.toggleRoundStart} restartGame={this.restartGame}/>} />
        </Switch>
      </div>
    );
  }
}


export default App;

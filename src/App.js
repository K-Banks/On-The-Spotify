import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import { Switch, Route } from 'react-router-dom';
import Game from './components/game/game';
import Header from './components/Header/Header';
import Token from './components/Token/Token';
import ErrorComponent from './components/ErrorComponent/ErrorComponent';
import { roundState } from './constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    let freshState = Object.assign({}, roundState);
    this.state = freshState;
    this.timer = 0;
    this.responseError = {};
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
    this.endRound = this.endRound.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.soundReady = this.soundReady.bind(this);
    this.startMusic = this.startMusic.bind(this);
    this.advanceCurrentRound = this.advanceCurrentRound.bind(this);
    this.handleResponseError = this.handleResponseError.bind(this);
    this.resetResponseError = this.resetResponseError.bind(this);
    this.addSongToUserLibrary = this.addSongToUserLibrary.bind(this);
  };

  grabUserToken(token) {
    let newState = this.state;
    newState.userToken = token;
    this.setState(newState, () => this.scrapeUserData());
  }

  handleResponseError(response) {
    this.responseError = response;
    window.location = '/#/error' + response.status;
  }

  resetResponseError() {
    this.responseError = {};
  }

  addSongToUserLibrary(songId) {
    let tempSongId = '3HivSIXzkrz9d6k4kGwHCU';
    const url = 'https://api.spotify.com/v1/me/tracks?ids=' + tempSongId;
    let anotherUrl = 'https://api.spotify.com/v1/me/tracks';
    fetch(anotherUrl, {
      method: "PUT",
      body: [tempSongId],
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => {
        console.log(response);
      }
    )
  }

  scrapeUserData() {
    const url = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.handleResponseError(response)
        }
      }
    ).then(
      data => {
        this.addUserArtists(data);
      }
    )
  }

  addUserArtists(data) {
    let tempState = this.state;
    while (tempState.gameData.answerArtistIds.length < this.state.gameData.gameRounds) {
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
      response => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.handleResponseError(response)
        }
      }
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
      if (wrongArtistsArray.includes(artistData.artists[rng].name) || artistData.artists[rng] === undefined) {
      } else {
        wrongArtistsArray.push(artistData.artists[rng].name);
      }
    }
    tempState.gameData.roundAnswers = wrongArtistsArray;
    this.setState(tempState, () => this.getArtistAlbums());
  }

  getArtistAlbums() {
    const url = 'https://api.spotify.com/v1/artists/' + this.state.gameData.answerArtistIds[this.state.gameData.currentRound] + '/albums?include_groups=album';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.userToken
      }
    }).then(
      response => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.handleResponseError(response)
        }
      }
    ).then(
      albumData => {
        let numberOfAlbums = albumData.items.length;
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
      response => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.handleResponseError(response)
        }
      }
    ).then(
      songData => {
        this.addRandomSong(songData, albumData, numberOfAlbums);
      }
    )
  }

  addRandomSong(songData, albumData, numberOfAlbums) {
    let numberOfTracks = songData.items.length;
    let rng = Math.floor(Math.random() * numberOfTracks);
    if (songData.items[rng].preview_url) {
      let tempState = this.state;
      tempState.gameData.songData.trackName = songData.items[rng].name;
      tempState.gameData.songData.trackAudio = songData.items[rng].preview_url;
      let answerArtistId = this.state.gameData.answerArtistIds[this.state.gameData.currentRound];
      for (var i = 0; i < songData.items[rng].artists.length; i++) {
        if (songData.items[rng].artists[i].id === answerArtistId) {
          tempState.gameData.songData.artistName = songData.items[rng].artists[i].name;
          break;
        }
      }
      this.setState(tempState);
    } else {
      this.getRandomSong(albumData, numberOfAlbums);
    }
  }

  resetRoundTimer() {
    let reset = this.state;
    reset.timeRemaining = 30;
    this.setState(reset, () => this.startTimer());
  }

  startTimer() {
    this.startMusic();
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
    this.setState(newState, () => this.advanceCurrentRound());
  }

  startNextRound() {
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
      this.endRound(false);
    }
  }

  soundReady() {
    let soundReadyState = this.state;
    soundReadyState.gameData.roundStatus = true;
    this.setState(soundReadyState);
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
    this.setState(newState, () => this.resetRoundTimer());
  };

  toggleRoundStart() {
    let toggle = this.state;
    if (toggle.gameData.roundStart) {
      toggle.gameData.roundStart = false;
      this.setState(toggle, () => this.getWrongArtists());
    } else {
      toggle.gameData.roundStart = true;
      this.setState(toggle, () => this.startNextRound());
    }
  }

  advanceCurrentRound() {
    let newRound = this.state;
    newRound.gameData.currentRound += 1;
    newRound.gameData.roundStatus = false;
    this.setState(newRound);
    if (this.state.gameData.currentRound >= this.state.gameData.gameRounds) {
      this.setState(newRound, () => this.endGame());
    } else {
      this.setState(newRound, () => this.toggleRoundStart());
    }
  }

  gameStart(){
    let game = this.state;
    game.gameData.gameStatus = true;
    this.setState(game, () => this.getWrongArtists());
  }

  endRound(boolean) {
    this.stopTimer();
    let audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = '';
    this.addRoundAnswer(boolean);
  }

  restartGame() {
    const freshState = Object.assign({}, roundState);
    this.setState(freshState, () => {
      window.location = '/';
    });
  }

  startMusic() {
    let audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
  }

  render() {
    return (
      <div className="App">
        <Header state={this.state}/>
        <button type="button" onClick={() => this.addSongToUserLibrary()}>Click to test adding song to library</button>
        <Switch>
          <Route exact path='/' render={()=><SignIn gameStart={this.gameStart} state={this.state} scrapeUserData={this.scrapeUserData}/>} />
          <Route path="/game" render={()=><Game soundReady={this.soundReady} state={this.state} endRound={this.endRound} toggleRoundStart={this.toggleRoundStart} restartGame={this.restartGame}/>} />
          <Route path="/access_token=:token" render={()=><Token grabUserToken={this.grabUserToken} state={this.state} gameStart={this.gameStart}/>}/>
          <Route render={()=><ErrorComponent responseError={this.responseError} resetResponseError={this.resetResponseError}/>}/>
        </Switch>
      </div>
    );
  }
}


export default App;

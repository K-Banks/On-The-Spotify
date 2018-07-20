import React, { Component } from 'react';
import './App.css';
import TestForm from './components/testForm';
import { Switch, Route } from 'react-router-dom';
import Game from './components/game/game';

class App extends Component {

  render(props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ME React</h1>
        </header>
        <Switch>
          <Route exact path='/' render={()=><TestForm state={props}/>} />
          <Route path="/game" render={()=><Game />} />
        </Switch>
      </div>
    );
  }
}


export default App;

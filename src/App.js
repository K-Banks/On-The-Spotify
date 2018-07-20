import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import TestForm from './components/testForm';
import { Switch, Route, withRouter } from 'react-router-dom';
import Game from './components/game/game';
import { Link } from 'react-router-dom';

class App extends Component {

  logger() {
    console.log(this.props);
  };

  render(props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ME React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Link to="/game">Test link</Link>
        </p>
        <Switch>
          <Route exact path='/' render={()=><TestForm />} />
          <Route path="/game" render={()=><Game />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default withRouter(connect(mapStateToProps)(App));

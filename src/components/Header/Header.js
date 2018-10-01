import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

function Header(props){
  function printState() {
    console.log(props.state);
  }

  return(
    <div>
      <header className="header">
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' className="logo" alt="logo" />
        <div className="bubble">
          <h1>ON THE SPOT-IFY</h1>
          <button onClick={() => {printState()}}k>Print state</button>
        </div>
      </header>
    </div>
  )
}

Header.propTypes = {
  state: PropTypes.object
}

export default Header;

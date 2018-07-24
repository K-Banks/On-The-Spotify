import React from 'react';
import './Header.css';

function Header(){
  return(
    <div>
      <header className="header">
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' className="logo" alt="logo" />
      <h1 className="title">Welcome to On-The-Spotify</h1>
      </header>
    </div>
  )
}

export default Header;

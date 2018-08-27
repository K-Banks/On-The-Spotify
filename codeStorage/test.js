import React from 'react';
import {roundState} from './../constants';

function Test(){
  let object = roundState;
  const apiKey = 'BQBz2trOY4HV4-Du96pEY0R5Vl2gBlff1X0291iro8kaRVNLBkUArForgmHYjyC2A5niN-1i7ZE8v54Ax7LIlHvwyaMrpMTnCKXhD_mFMgOzcHEtlLjvpxGSo7hgU1FsM0_QxeQfbdf560IuFJOBdkLXbg';

  function logger() {
    console.log('you clicked the test');
    scrapeUserData();
  }

  function scrapeUserData() {
    console.log('scraping data');
    const url = 'https://api.spotify.com/v1/me/top/artists';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      }
    }).then(
      response => response.json()
    ).then(
      data => {
        addUserArtists(data);
      }
    )
  }

  function addUserArtists(data) {
    while (object.gameData.answerArtistIds.length < 5) {
      let rng = Math.floor(Math.random() * 20);
      if (object.gameData.answerArtistIds.includes(data.items[rng].name)) {
      } else {
        object.gameData.answerArtistIds.push(data.items[rng].id);
      }
    }
    getWrongArtists(data.items[object.gameData.currentRound].id);
    getArtistAlbums(data.items[object.gameData.currentRound].id);
  }

  function getWrongArtists() {
    let url = 'https://api.spotify.com/v1/artists/' + object.gameData.answerArtistIds[0] + '/related-artists';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      }
    }).then(
      response => response.json()
    ).then(
      artistData=>{
        addWrongArtists(artistData);
      }
    )
  }

  function addWrongArtists(artistData) {
    let wrongArtistsArray = [];
    while (wrongArtistsArray.length < 3) {
      let rng = Math.floor(Math.random() * 20);
      if (wrongArtistsArray.includes(artistData.artists[rng].name)) {
      } else {
        wrongArtistsArray.push(artistData.artists[rng].name);
      }
    }
    object.gameData.roundAnswers = wrongArtistsArray;
  }

  function getArtistAlbums(artistId) {
    console.log('getting albums');
    const url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
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
        object.gameData.songData.artistName = albumData.items[0].artists[0].name;
        getRandomSong(albumData, numberOfAlbums)
      }
    )
  }

  function getRandomSong(albumData, numberOfAlbums) {
    let rng = Math.floor(Math.random() * numberOfAlbums);
    let albumSelection = albumData.items[rng].id;
    console.log(albumSelection);
    const url = 'https://api.spotify.com/v1/albums/' + albumSelection + '/tracks';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      }
    }).then(
      response => response.json()
    ).then(
      songData => {
        console.log('song data');
        console.log(songData);
        addRandomSong(songData);
      }
    )
  }

  function addRandomSong(songData) {
    let numberOfTracks = songData.items.length;
    let rng = Math.floor(Math.random() * numberOfTracks);
    object.gameData.songData.trackName = songData.items[rng].name;
    object.gameData.songData.trackAudio = songData.items[rng].preview_url;
    console.log(object);
  }

  return(
    <div>
      <h1>Test Component working</h1>
      <button onClick={()=> {logger()}}>Log me</button>
    </div>
  )
}

export default Test;

import React from 'react';

function Test(){
  let object = {
    artists: [],
    artistId: [],
    wrongArtists: [],
    songName: [],
    songURL: []
  };
  const apiKey = 'BQBDGN81umm-8186MZBIRvcLTZ-QZTxs7L0xTQl2Hmf1Em5rYyQLYwbnJe19-4bp6Uk5RxlmqXEnXGCxnST2z1yOzO_wB6zTBfv_5ze6Jg4oAXwHjt23ohbgLIgNvKl0YEeXrn92biYWJ8wcVDeLfp1xgA';

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
    while (object.artists.length < 5) {
      let rng = Math.floor(Math.random() * 20);
      if (object.artists.includes(data.items[rng].name)) {
      } else {
        object.artists.push(data.items[rng].name);
        object.artistId.push(data.items[rng].id);
        getWrongArtists(data.items[rng].id);
        getArtistAlbums(data.items[rng].id);
      }
    }
  }

  function getWrongArtists() {
    let url = 'https://api.spotify.com/v1/artists/' + object.artistId[0] + '/related-artists';
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
    object.wrongArtists.push(wrongArtistsArray);
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
    object.songName.push(songData.items[rng].name);
    object.songURL.push(songData.items[rng].preview_url);
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

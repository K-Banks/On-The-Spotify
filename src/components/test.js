import React from 'react';

function Test(){
  let object = {
    artists: [],
    artistId: [],
    wrongArtists: []
  };
  const apiKey = 'BQA4lClYwOfsUP7dPpOddFghUhSH_AaC86_cqJ-Q6--2smV9NbUYxDrnma4sZQq340H7KpRXXERxU9JJMn8EjxbAAC9_G4PlweeAQOrFeJiRg3j3_-z8DML__xQE6Ph1tIIfabV5sZzi-V6RgIz00Gl5RA';

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
        console.log(data);
        console.log(data.items);
        addUserArtists(data);
      }
    )
  }

  function addUserArtists(data) {
    while (object.artists.length < 10) {
      let rng = Math.floor(Math.random() * 20);
      if (object.artists.includes(data.items[rng].name)) {
        console.log('nope');
      } else {
        object.artists.push(data.items[rng].name);
        object.artistId.push(data.items[rng].id);
        getWrongArtists(data.items[rng].id);
      }
      console.log(object);
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
        console.log(artistData);
        addWrongArtists(artistData);
      }
    )
  }

  function addWrongArtists(artistData) {
    let wrongArtistsArray = [];
    while (wrongArtistsArray.length < 3) {
      let rng = Math.floor(Math.random() * 20);
      if (wrongArtistsArray.includes(artistData.artists[rng].name)) {
        console.log('nope');
      } else {
        wrongArtistsArray.push(artistData.artists[rng].name);
      }
      console.log(object);
    }
    object.wrongArtists.push(wrongArtistsArray);
  }

  return(
    <div>
      <h1>Test Component working</h1>
      <button onClick={()=> {logger()}}>Log me</button>
    </div>
  )
}

export default Test;

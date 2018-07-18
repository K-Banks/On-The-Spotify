import * as types from './../constants';
import { CALL_API } from 'redux-api-middleware';

export function fetchSong() {
  const url = 'https://api.spotify.com/v1/artists/1LeVJ5GPeYDOVUjxx1y7Rp';
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + 'AQDRomX2sLJes1St1TKZLxKBZsIL_uHdRCxToGoNIHlFv0ewbirkOJufybqkl6UrV8q_eWY02U4dADusP8xpZLxhJ0JtQ0_Y5uxsCw2x4wFIFfv-6MQJ4ibzomrk0tXkZdo'
    }
  }).then(
    response => response.json()
  ).then(
    data => {
      console.log(data);
    }
  );
}

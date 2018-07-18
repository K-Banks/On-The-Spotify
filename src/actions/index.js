import { getKey } from './../key';

export function fetchSong() {
  const url = 'https://api.spotify.com/v1/me/top/artists';
  let key = getKey();
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + key
    }
  }).then(
    response => response.json()
  ).then(
    data => {
      console.log(data);
    }
  );
}

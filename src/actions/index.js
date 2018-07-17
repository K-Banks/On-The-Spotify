import * as types from './../constants';
import { CALL_API } from 'redux-api-middleware';

export function fetchSong() {
  return {
    [CALL_API]: {
      endpoint: 'https://api.spotify.com/v1/artists/066X20Nz7iquqkkCW6Jxy6',
      method: 'GET',
      // Don't have to manually add the Authorization header to every request.
      headers: { 'Content-Type': 'application/json' },
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  }
}

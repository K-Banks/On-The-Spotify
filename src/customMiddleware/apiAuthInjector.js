import { CALL_API } from 'redux-api-middleware';
import { getKey } from './../keys/';

export default store => next => action => {
  const callApi = action[CALL_API];
  if (callApi) {
    callApi.headers = Object.assign({}, callApi.headers, {
      'Authorization': 'Bearer ' + getKey()
    });
    console.log(callApi.headers);
  }
  return next(action);
}

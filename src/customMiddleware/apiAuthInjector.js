import { CALL_API } from 'redux-api-middleware';
import APIKEY from './../keys/apiAuth';

export default store => next => action => {
  const callApi = action[CALL_API];
  if (callApi) {
    callApi.headers = Object.assign({}, callApi.headers, {
    });
  }
  return next(action);
}

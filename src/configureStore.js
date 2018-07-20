import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';
import apiAuthInjector from './customMiddleware/apiAuthInjector';

export default function(initialState) {
  console.log(initialState);
  return createStore(rootReducer, initialState, applyMiddleware(
    apiMiddleware
  ))
}

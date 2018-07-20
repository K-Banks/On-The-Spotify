import { combineReducers } from 'redux';
import songReducer from './songReducer.js';

const rootReducer = combineReducers({
  songReducer: songReducer
});

export default rootReducer;

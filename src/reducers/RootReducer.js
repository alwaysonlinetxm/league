import { combineReducers } from 'redux';
import common from './CommonReducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    common,
    ...asyncReducers
  });
}

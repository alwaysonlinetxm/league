import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import ActionTypes from '../constants/ActionTypes';

const initState = Immutable({
  text: 'init common'
});

export default handleActions({
  [ActionTypes.SHOW_TEXT]: (state, action) => state.merge({ text: action.payload.text })
}, initState);

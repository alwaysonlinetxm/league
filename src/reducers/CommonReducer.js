import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

const initState = {
  text: 'init common'
};

export default handleActions({
  [ActionTypes.SHOW_TEXT]: (state, action) => Object.assign({}, state, { text: action.payload.text })
}, initState);

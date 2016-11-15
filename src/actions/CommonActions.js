import { createActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

export default createActions({
  [ActionTypes.SHOW_TEXT]: text => ({ text })
});

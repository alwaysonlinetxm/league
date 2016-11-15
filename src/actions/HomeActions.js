import { createActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

export default createActions({
  [ActionTypes.GET_MEMBER]: () => ({}),
  [ActionTypes.SAGA_TASK]: node => ({ node }),
  [ActionTypes.SAGA_TASK_REAL]: node => ({ node })
});

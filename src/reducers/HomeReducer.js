import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import ActionTypes from '../constants/ActionTypes';

const initState = Immutable({
  list: [],
  total: 0,
  text: ''
});

// test data
const data = {
  list: [{
    name: 'item1',
    num: 1
  }, {
    name: 'item2',
    num: 2
  }],
  total: 2,
  text: 'first text'
};

export default handleActions({
  [ActionTypes.GET_MEMBER]: (state) => state.merge(data),
  [ActionTypes.SAGA_TASK_REAL]: (state, action) => state.merge({ list: state.list.concat([action.payload.node]) })
}, initState);

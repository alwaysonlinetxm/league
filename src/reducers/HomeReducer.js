import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

const initState = {
  list: [],
  total: 0
};

// test data
const data = {
  list: [{
    name: '盖伦',
    num: 1
  }, {
    name: '赵信',
    num: 2
  }],
  total: 2
};

export default handleActions({
  [ActionTypes.GET_MEMBER]: () => data,
  [ActionTypes.SAGA_TASK_REAL]: (state, action) => Object.assign({}, state, { list: state.list.concat([action.payload.node]) })
}, initState);

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

export default (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MEMBER:
      return data;
    case ActionTypes.SAGA_TASK:
      console.log('------ SAGA_TASK ------');
      return data;
    case ActionTypes.SAGA_TASK_REAL:
      console.log('------ SAGA_TASK_REAL ------');
      return Object.assign({}, state, { list: state.list.concat([action.payload]) });
    default:
      return state;
  }
};

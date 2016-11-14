import ActionTypes from '../constants/ActionTypes';

function getMember() {
  return {
    type: ActionTypes.GET_MEMBER
  };
}

function testSaga(payload) {
  return {
    type: ActionTypes.SAGA_TASK,
    payload
  }
}

export { getMember, testSaga };

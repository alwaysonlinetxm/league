import ActionTypes from '../constants/ActionTypes';

function getMember() {
  return {
    type: ActionTypes.GET_MEMBER
  };
}

export { getMember };

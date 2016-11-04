import ActionTypes from '../constants/ActionTypes';

const initState = {
  text: 'init common'
};

export default (state = initState, action) => {
  switch (action.type) {
		case ActionTypes.SHOW_TEXT:
			return Object.assign({}, state, { text: action.text });
    default:
      return state;
  }
};

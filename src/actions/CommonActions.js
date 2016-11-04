import ActionTypes from '../constants/ActionTypes';

function showText(text) {
  return {
    type: ActionTypes.SHOW_TEXT,
    text: text
  };
}

export { showText }

import { take, call, put } from 'redux-saga/effects';
import ActionTypes from '../constants/ActionTypes';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function* testTask() {
  while (true) {
    const { payload } = yield take(ActionTypes.SAGA_TASK);
    yield call(delay, 2000);
    console.log('------ delay 2000ms ------');
    fetch('//offline-news-api.herokuapp.com/stories').then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(stories => console.log(stories));

    yield put({
      type: ActionTypes.SAGA_TASK_REAL,
      payload
    });
  }
}

export { testTask };

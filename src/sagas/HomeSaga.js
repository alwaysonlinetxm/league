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
    yield put({
      type: ActionTypes.SAGA_TASK_REAL,
      payload
    });
  }
}

export { testTask };

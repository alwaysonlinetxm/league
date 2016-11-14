import { fork } from 'redux-saga/effects';
import { testTask } from './HomeSaga';

export default function* rootSaga() {
  yield fork(testTask);
}

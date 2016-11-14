import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reducers/RootReducer';
import rootSaga from '../sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(ThunkMiddleware, loggerMiddleware(), sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

// will cover the initState in reducer
const initialState = {};
const store = createStore(createReducer(), initialState, enhancer);
store.asyncReducers = {};
sagaMiddleware.run(rootSaga);

export function injectAsyncReducer(asyncReducers) {
  Object.assign(store.asyncReducers, asyncReducers);
  store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;

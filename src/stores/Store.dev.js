import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import createReducer from '../reducers/RootReducer';

const enhancer = compose(
  applyMiddleware(ThunkMiddleware, loggerMiddleware()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

// will cover the initState in reducer
const initialState = {};
const store = createStore(createReducer(), initialState, enhancer);
store.asyncReducers = {};

export function injectAsyncReducer(asyncReducers) {
  Object.assign(store.asyncReducers, asyncReducers);
  store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;

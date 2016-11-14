import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middlewares/api';
import createReducer from '../reducers/RootReducer';

const enhancer = applyMiddleware(ThunkMiddleware, apiMiddleware);

// will cover the initState in reducer
const initialState = {};
const store = createStore(createReducer(), initialState, enhancer);
store.asyncReducers = {};

export function injectAsyncReducer(asyncReducers) {
  Object.assign(store.asyncReducers, asyncReducers);
  store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;

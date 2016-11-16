import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reducers/RootReducer';
import rootSaga from '../sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(ThunkMiddleware, sagaMiddleware);

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

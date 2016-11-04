import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middlewares/api';
import createReducer from '../reducers/RootReducer';

// will cover the initState in reducer
const initialState = {};

const enhancer = applyMiddleware(ThunkMiddleware, apiMiddleware);

function configureStore(initialState) {
    const store = createStore(createReducer(), initialState, enhancer);
    store.asyncReducers = {};
    return store;
}

const store = configureStore();

export function injectAsyncReducer(asyncReducers) {
    Object.assign(store.asyncReducers, asyncReducers);
    store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;

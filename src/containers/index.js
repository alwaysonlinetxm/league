import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// part import for less size
// import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';
import Store, { injectAsyncReducer } from '../stores/Store';
import Root from './Root';

const rootRoute = {
  path: '/',
  component: Root,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer({
          home: require('../reducers/HomeReducer.js')
        });
        cb(null, require('../routes/home/Home'));
      });
    }
  },
  childRoutes: [
    require('../routes/home'),
    require('../routes/demaxiya')
  ]
};

ReactDOM.render(
  <Provider store={ Store }>
    <Router history={ hashHistory } routes={ rootRoute } />
  </Provider>,
  document.getElementById('app')
);

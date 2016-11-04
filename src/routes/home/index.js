import { injectAsyncReducer } from '../../stores/Store';

module.exports = {
  path: '/home',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectAsyncReducer({
        home: require('../../reducers/HomeReducer.js')
      });
      cb(null, require('./Home'));
    });
  }
};

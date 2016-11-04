module.exports = {
  path: '/demaxiya',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Demaxiya'));
    });
  }
};

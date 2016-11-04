module.exports = process.env.NODE_ENV === 'production' ? require('./Store.prod') : require('./Store.dev');

const bunyan = require('bunyan');
const Hapi = require('hapi');
const server = new Hapi.Server();
const api = require('./api');
const env = process.env;

const log = bunyan.createLogger({
  name: 'Cocos2d server',
  level: 'info'
});

server.connection({
  host: env.HOST,
  labels: ['api'],
  port: env.PORT
});

server.register(api, err => {
  if (err) {
    throw err;
  }

  server.start();
  log.info('server is running');
});

global.log = log;
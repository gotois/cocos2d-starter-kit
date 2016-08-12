'use strict';
const bunyan = require('bunyan');
const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const socketIO = require('socket.io');

const env = process.env;
const server = new Hapi.Server();
server.register(Inert, () => {
});

server.connection({
  host: env.HOST,
  labels: ['static'],
  port: env.PORT
});

server.connection({
  host: env.HOST,
  port: 4001,
  labels: ['api']
});

const log = global.log = bunyan.createLogger({
  name: 'Cocos2d server',
  level: 'info'
});

const apiServer = server.select('api');
global.io = socketIO(apiServer.listener);

const staticServer = server.select('static');
staticServer.route({
  path: '/{client*}',
  method: 'GET',
  handler: {
    directory: {
      path: Path.join(__dirname, './../client')
    }
  }
});

server.start(error => {
  if (error) {
    throw error;
  }

  require('./api');
  log.info('Server started');
});

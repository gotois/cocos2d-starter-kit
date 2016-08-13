'use strict';
const bunyan = require('bunyan');
const Hapi = require('hapi');
const socketIO = require('socket.io');

const env = process.env;
const server = new Hapi.Server();

/*
Static WebServer
const Inert = require('inert');
const Path = require('path');
server.register(Inert, () => {
});
server.connection({
  host: env.HOST,
  labels: ['static'],
  port: env.PORT
});
const staticServer = server.select('static');
staticServer.route({
  path: '/{client*}',
  method: 'GET',
  handler: {
    directory: {
      path: Path.join(__dirname, './../client')
    }
  }
});*/

server.connection({
  host: env.HOST,
  port: env.PORT,
  labels: ['api']
});

const log = global.log = bunyan.createLogger({
  name: 'Cocos2d server',
  level: 'info'
});

const apiServer = server.select('api');
global.io = socketIO(apiServer.listener);

server.start(error => {
  if (error) {
    throw error;
  }

  require('./api');
  log.info('Server started');
});

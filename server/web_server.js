/*!
 * Server
 * Copyright(c) 2015-2016 Denis Baskovsky <denis@baskovsky.ru>
 */

const Hapi = require('hapi');
const server = new Hapi.Server();
const api = require('./api');
const env = process.env;

server.connection({
  host: env.HOST,
  labels: ['api'],
  port: env.PORT
});

server.register(api, (err) => {
  if (err) {
    throw err;
  }

  server.start();

  console.log('server is running');
});

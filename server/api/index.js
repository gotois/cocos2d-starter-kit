const socketIO = require('socket.io');
const chat = require('./chat');
const ioDefault = require('./ioDefault');

exports.register = function (server, options, next) {
  const io = socketIO(server.select('api').listener);

  io.on('connection', socket => {
    log.info('New socket connect');

    chat(socket);
    ioDefault(socket);
  });

  next();
};

exports.register.attributes = {
  name: 'api'
};
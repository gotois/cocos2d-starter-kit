const Handlers = require('./handlers');

module.exports = function (socket) {
  with (Handlers) {

    socket.emit('backendStatus', 'connection ready!');
    socket.on('hello', Handlers.hello);
    socket.on('newMessage', Handlers.newMessage);
    socket.on('goodbye', Handlers.goodbye);
  }
};
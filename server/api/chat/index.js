const Handlers = require('./handlers');

module.exports = function (socket) {
  socket.on('hello', Handlers.hello);
};
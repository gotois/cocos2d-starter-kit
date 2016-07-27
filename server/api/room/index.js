const Handlers = require('./handlers');

module.exports = function (socket) {
  with (Handlers) {
    socket.on('createRoom', createRoom.bind(socket));
    socket.on('getRandomRoom', getRandomRoom.bind(socket));
    socket.on('getAllRooms', getAllRooms.bind(socket));
  }
};
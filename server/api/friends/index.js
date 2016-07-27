const Handlers = require('./handlers');

module.exports = function (socket) {
  with (Handlers) {
    socket.on('getFriendList', getFriendList.bind(socket));
    socket.on('showCalls', showCalls.bind(socket));
    socket.on('removeFriend', removeFriend.bind(socket));
    socket.on('showRequests', showRequests.bind(socket));
    socket.on('addFriend', addFriend.bind(socket));
    socket.on('ignoreFriend', ignoreFriend.bind(socket));
    socket.on('ignoreFriend', ignoreFriend.bind(socket));
  }
};
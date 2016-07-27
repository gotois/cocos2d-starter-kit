/**
 *
 * // отправить текущему сокету сформировавшему запрос (туда откуда пришла)
 socket.emit('eventClient', "this is a test");

 // отправить всем пользователям, включая отправителя
 io.sockets.emit('eventClient', "this is a test");

 // отправить всем, кроме отправителя
 socket.broadcast.emit('eventClient', "this is a test");

 // отправить всем клиентам в комнате (канале) 'game', кроме отправителя
 socket.broadcast.to('game').emit('eventClient', 'nice game');

 // отправить всем клиентам в комнате (канале) 'game', включая отправителя
 io.sockets.in('game').emit('eventClient', 'cool game');

 // отправить конкретному сокету, по socketid
 io.sockets.socket(socketid).emit('eventClient', 'for your eyes only');
 *
 */

const friends = require('./friends');
const chat = require('./chat');
const room = require('./room');
const socketIO = require('socket.io');

exports.register = function (server, options, next) {
  const io = socketIO(server.select('api').listener);

  io.on('connection', (socket) => {
    console.log('on connection!');

    friends(socket);
    chat(socket);
    room(socket);
  });

  next();
};

exports.register.attributes = {
  name: 'api'
};
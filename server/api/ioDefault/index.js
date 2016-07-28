module.exports = function (socket) {

  socket.on('message', message => {
    log.info(message);
  });

  socket.on('disconnect', () => {
    log.info('Server disconnect');
  });

};
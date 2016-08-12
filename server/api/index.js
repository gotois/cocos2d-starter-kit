const chat = require('./chat');
const ioDefault = require('./ioDefault');

io.on('connection', socket => {
  log.info('New socket connect');

  chat(socket);
  ioDefault(socket);
});

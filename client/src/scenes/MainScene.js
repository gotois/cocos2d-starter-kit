import layers from './../layers/layers.js';

export default cc.Scene.extend({
  ctor,
  onEnter,
  onExit
});

function ctor() {
  this._super();

  const menuLayer = new layers.MenuLayer();
  this.addChild(menuLayer);

  // Socket.IO connect
  const socket = window.io.connect(location.hostname === 'localhost' ?
    '//localhost:4000' :
    cc.game.config.serverWS
  );
  socket.on('connect', () => {
    socket.emit('hello', 'server');
  });
  socket.on('message', message => {
    cc.log(`Received a ${ message }`);
  });
  socket.on('disconnect', () => {
    cc.log('The client has disconnected!');
  });
  // Custom listeners
  socket.on('status', data => {
    cc.log(data);
    socket.send('Wazzaaaap!');
  });
 
}

function onEnter() {
  this._super();
}

function onExit() {
  this._super();
  this.release();
}

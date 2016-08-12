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

  // Socket.IO example
  const socket = io.connect('//localhost:4001');
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
    socket.send('wazzaaaap!');
  });
 
}

function onEnter() {
  this._super();
}

function onExit() {
  this._super();
  this.release();
}

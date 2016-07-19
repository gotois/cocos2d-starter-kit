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
 
}

function onEnter() {
  this._super();
}

function onExit() {
  this._super();
  this.release();
}

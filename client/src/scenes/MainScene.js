import {res} from '../elements/resources/resource.js';
import scenes from './scenes.js';
import layers from './../layers/layers.js';

export default cc.Scene.extend({
  ctor,
  onEnter,
  onExit
});

function ctor() {
	this._super();
}

function onEnter() {
  this._super();
}

function onExit() {
  this._super();
  this.release();
}
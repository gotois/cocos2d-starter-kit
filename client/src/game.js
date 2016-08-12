import './elements/resources/g_resources.js';
import scenes from './scenes/scenes.js';

cc.Scene.implement({$: {}});

function run() {

  cc.loader.load(window.g_resources, () => {
    const logo = cc.$('#logo');
    logo.parentNode.removeChild(logo);

    cc.director.runScene(new scenes.MainScene());
  });

  if (typeof  window.io === 'undefined') {
    throw 'socket.io is not a defined';
  }

}

if (cc.sys.isMobile) {
  document.addEventListener('deviceready', deviceready, true);
} else {
  run();
}

function deviceready() {

  Promise
    .all([])
    .then(() => {
    })
    .catch(err => {
      cc.log(err);
    })
    .then(() => {
      run();
    });

}
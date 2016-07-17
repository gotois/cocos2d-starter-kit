import scenes from './scenes/scenes.js';
import {g_resources} from './elements/resources/resource.js';

cc.Scene.implement({$: {}});

function run() {

  cc.loader.load(g_resources, () => {
    const logo = cc.$('#logo');
    logo.parentNode.removeChild(logo);

    cc.director.runScene(new scenes.MainScene());
  });

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
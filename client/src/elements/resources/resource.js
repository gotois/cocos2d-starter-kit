cc.loader.resPath = 'res/';
cc.loader.audioPath = 'res/audio/';

const FONTS_PATH = 'Fonts';
const SOUNDS_PATH = 'sounds';
const ATLASES_PATH = 'Atlases';
const LAYERS_PATH = 'Layers';
const ELEMENTS_PATH = 'Elements';

// TODO: separate resources by type (etc. Srites, Sounds, Fonts..)
const res = {

  /// Scenes
  /////////////////////////////////////////////////////////////////////

  'MainScene': 'MainScene.json',
  'GameScene': 'GameScene.json',
  'SettingsScene': 'SettingsScene.json',
  'RatingScene': 'RatingScene.json'

};

let g_resources = [];
for (let i in res) {
  if (res.hasOwnProperty(i)) {
    g_resources.push(res[i]);
  }
}

export {
  res,
  g_resources
};

cc.extend(window.res, res);

export default res;
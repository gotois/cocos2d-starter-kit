/* @flow weak */

export default cc.Layer.extend({
  ctor
});

function ctor(): void {
  this._super();

  const size = cc.view.getDesignResolutionSize();

  const sprite = new cc.Sprite('HelloWorld.png');
  sprite.setPosition(size.width / 2, size.height / 2);

  this.addChild(sprite, 0);

  const labelStr = 'Hello Cocos2d World!';

  const label = new cc.LabelTTF(
    labelStr,
    'Arial',
    40
  );
  label.setAnchorPoint(cc.p(0.5, 1));
  label.setPositionX(size.width / 2);
  label.setPositionY(size.height / 2);

  this.addChild(label, 1);

}

export default cc.Layer.extend({
  ctor
});

function ctor() {
  this._super();

  const size = cc.view.getDesignResolutionSize();

  const sprite = new cc.Sprite('HelloWorld.png');
  sprite.setPosition(size.width / 2, size.height / 2);

  this.addChild(sprite, 0);

  const label = new cc.LabelTTF(
    'Hello Cocos2d World!',
    'Arial',
    40
  );
  label.setAnchorPoint(cc.p(0.5, 1));
  label.setPositionX(size.width / 2);
  label.setPositionY(size.height / 2);

  this.addChild(label, 1);

}

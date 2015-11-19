var TestPlayer = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("assets/sprShotgun_Strip7.png", cc.rect(0,0,21,8));
        this.setAnchorPoint(0,0);
    }
});
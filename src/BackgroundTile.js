var BackgroundTile = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("assets/target.png", cc.rect(0,0,64,64));
        this.setAnchorPoint(0,0);
    }
});
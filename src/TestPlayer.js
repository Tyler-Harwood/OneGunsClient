var TestPlayer = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("assets/target.png", cc.rect(0,0,32,32));
        this.setAnchorPoint(0,0);
    }
});
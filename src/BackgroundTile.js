var BackgroundTile = cc.Sprite.extend({
    ctor: function (tile) {
        this._super();

        this.initWithFile("assets/sprFloor1_strip4.png", cc.rect(32*random,0,32,32));
        this.setAnchorPoint(0,0);
    }
});
var BackgroundTile = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var random = Math.floor((Math.random()*100)%4);
        this.initWithFile("assets/sprFloor1_strip4.png", cc.rect(32*random,0,32,32));
        this.setAnchorPoint(0,0);
    }
});
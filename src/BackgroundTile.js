var BackgroundTile = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var tile = Math.floor((Math.random() * 10) % 4);
        //this.initWithFile("assets/sprFloor1_strip4.png", cc.rect(16*tile,0,16,16));
        this.initWithFile("assets/target.png", cc.rect(0,0,64,64));
        this.setAnchorPoint(0,0);
    }
});
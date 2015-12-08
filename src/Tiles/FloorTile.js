var FloorTile = cc.Sprite.extend({
    tileData: null,
    ctor: function (random) {
        this._super();

        this.tileData = new TileData();

        var rand = Math.floor(100*random % 4);

        this.initWithFile("assets/sprFloor1_strip4.png", cc.rect(32*rand,0,32,32));
        this.setAnchorPoint(0,0);
    },
    getTileData: function() {
        return this.tileData;
    }
});
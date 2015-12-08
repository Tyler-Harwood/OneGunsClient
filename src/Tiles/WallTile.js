var WallTile = cc.Sprite.extend({
    tileData: null,
    ctor: function (random) {
        this._super();

        this.tileData = new TileData();
        this.tileData.setImpassible(true);

        var rand = Math.floor(10*random % 4);

        this.initWithFile("assets/sprWall1Top_strip4.png", cc.rect(16*rand,0,16,16));
        this.setScale(2);
        this.setAnchorPoint(0,0);
    },
    getTileData: function() {
        return this.tileData;
    }
});
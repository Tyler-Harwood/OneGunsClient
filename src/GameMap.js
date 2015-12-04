var GameMap = cc.Class.extend({
    tileMap: null,
    sprite: null,
    shape: null,
    tileWidth: 0,
    tileHeight: 0,
    getTileMap: function() {
        return this.tileMap;
    },
    /** Constructor
     * @param spriteSheet {cc.SpriteBatchNode *}
     * @param space {cp.Space *}
     * @param pos {cc.p}
     */
    ctor: function (seed) {
        this.tileWidth = 20;
        this.tileHeight = 20;

        this.tileMap = new Array(this.tileWidth);

        for (var i = 0; i < this.tileWidth; i++) {
            this.tileMap[i] = new Array(this.tileHeight);
        }

        for (var x = 0; x < this.tileWidth; x++) {
            for (var y = 0; y < this.tileHeight; y++) {
                this.tileMap[x][y] = new BackgroundTile();
                this.tileMap[x][y].setPosition(x * SPRITE_SIZE, y * SPRITE_SIZE);
            }
        }
    },

    removeFromParent: function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },

    getShape: function () {
        return this.shape;
    }
});
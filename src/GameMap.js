var GameMap = cc.Class.extend({
    tileMap: null,
    randomizer:null,
    sprite: null,
    shape: null,
    tileWidth: 0,
    tileHeight: 0,
    /** Constructor
     * @param tileWidth
     * @param tileHeight
     * @param seed
     */
    ctor: function (tileWidth, tileHeight, seed) {
        this.tileWidth = 20;
        this.tileHeight = 20;

        this.randomizer = new Randomizer(seed);

        this.tileMap = new Array(this.tileWidth);

        for (var i = 0; i < this.tileWidth; i++) {
            this.tileMap[i] = new Array(this.tileHeight);
        }

        for (var x = 0; x < this.tileWidth; x++) {
            for (var y = 0; y < this.tileHeight; y++) {
                var random1 = this.randomizer.random1();
                var random2 = this.randomizer.random1();
                var number = Math.floor(random2*10 % 5);
                if (number === 0) {
                    this.tileMap[x][y] = new WallTile(random1);
                } else {
                    this.tileMap[x][y] = new FloorTile(random1);
                }
                this.tileMap[x][y].setPosition(x * SPRITE_SIZE, y * SPRITE_SIZE);
            }
        }
    },
    getTileMap: function() {
        return this.tileMap;
    },
    wtf: function(x, y) {
        var xPosition;
        var yPosition;

        if (y === undefined){
            xPosition = x.x;
            yPosition = x.y;
        } else {
            xPosition = x;
            yPosition = y;
        }

        if (xPosition >= this.width || xPosition < 0 || yPosition >= this.height || yPosition < 0) {
            return null;
        } else {
            return this.tileMap[xPosition][yPosition];
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
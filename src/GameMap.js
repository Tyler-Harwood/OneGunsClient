var GameMap = cc.Class.extend({
    tileMap: null,
    randomizer: null,
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
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.randomizer = new Randomizer(seed);

        this.tileMap = new Array(this.tileWidth);

        for (var i = 0; i < this.tileWidth; i++) {
            this.tileMap[i] = new Array(this.tileHeight);
        }

        for (var x = 0; x < this.tileWidth; x++) {
            for (var y = 0; y < this.tileHeight; y++) {
                var random1 = this.randomizer.random1();
                var random2 = this.randomizer.random1();
                var number = Math.floor(random2 * 10 % 5);
                if (number === 0) {
                    this.tileMap[x][y] = new WallTile(random1);
                } else {
                    this.tileMap[x][y] = new FloorTile(random1);
                }
                this.tileMap[x][y].setPosition(x * SPRITE_SIZE, y * SPRITE_SIZE);
            }
        }
    },
    getTileMap: function () {
        return this.tileMap;
    },
    getTile: function (x, y) {
        var xPosition;
        var yPosition;

        if (y === undefined) {
            xPosition = x.x;
            yPosition = x.y;
        } else {
            xPosition = x;
            yPosition = y;
        }

        if (xPosition >= this.tileWidth || xPosition < 0 || yPosition >= this.tileHeight || yPosition < 0) {
            return null;
        } else {
            return this.tileMap[xPosition][yPosition];
        }
    },
    getValidMoves: function (currentTilePosition, movementRange) {
        //Start at top left corner
        var startX = currentTilePosition.x - movementRange;
        var startY = currentTilePosition.y - movementRange;
        var endX = currentTilePosition.x + movementRange;
        var endY = currentTilePosition.y + movementRange;

        var validMoves = [];

        for (var x = startX; x <= endX; x++) {
            for (var y = startY; y <= endY; y++) {
                if (Math.abs(currentTilePosition.x - x) + Math.abs(currentTilePosition.y - y) <= movementRange) {
                    var tile = this.getTile(x, y);

                    if (tile != null && !tile.getTileData().getImpassible()) {
                        validMoves.push(cc.p(x, y));
                    }
                }
            }
        }
        //Loop over all tiles to bottom right corner
        //Check if the distance is within the movement range if so add it to the valid moves list
        return validMoves;
    }
});
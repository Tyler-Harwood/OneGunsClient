var LogicLayer = cc.Class.extend({
    characterManager: null,
    mapManager: null,
    tileWidth: 0,
    tileHeight: 0,
    /** Constructor
     * @param tileWidth
     * @param tileHeight
     * @param seed
     */
    ctor: function (tileWidth, tileHeight, seed) {
        this.mapManager = new MapManager(this.tileWidth, this.tileHeight, this.seed);
        var tileMap = this.mapManager.getTileMap();
        for (var x = 0; x < this.tileWidth; x++) {
            for (var y = 0; y < this.tileHeight; y++) {
                this.backgroundLayer.addChild(tileMap[x][y], 0);
            }
        }

        this.characterManager = new CharacterManager();
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
                        var point = cc.p(x, y);
                        if (this.getPathAStar(currentTilePosition, point, movementRange)) {
                            validMoves.push(point);
                        }
                    }
                }
            }
        }
        //Loop over all tiles to bottom right corner
        //Check if the distance is within the movement range if so add it to the valid moves list
        return validMoves;
    },
    getPathAStar: function (fromPoint, toPoint, movementRange) {
        function Path(points) {
            this.cost = 0;
            if (points != null) {
                this.points = points.slice(0);
            } else {
                this.points = [];
            }
            this.calculateCost = function () {
                //distance to toPoint
                var currentPoint = this.points[this.points.length - 1];

                var distanceToGoal = Math.abs(currentPoint.x - toPoint.x) + Math.abs(currentPoint.y - toPoint.y);
                var distanceTraveled = points.length;

                this.cost = distanceToGoal + distanceTraveled;

                return this.cost;
            }
        }

        var visitedPoints = new Array(this.tileWidth);

        for (var x = 0; x < this.tileWidth; x++) {
            visitedPoints[x] = new Array(this.tileHeight);
            for (var y = 0; y < this.tileHeight; y++) {
                visitedPoints[x][y] = false;
            }
        }

        var initialPath = new Path();
        initialPath.points.push(fromPoint);

        var paths = [initialPath];

        var iterations = 0;
        while (paths.length > 0) {
            iterations++;
            var currentPath = paths[0];

            var currentPoint = currentPath.points[currentPath.points.length - 1];

            if (currentPoint.x === toPoint.x && currentPoint.y === toPoint.y) {
                return currentPath.points;
            }

            if (currentPath.length > movementRange) {
                paths.shift();
                continue;
            }

            var checkPoints = [
                cc.p(currentPoint.x, currentPoint.y + 1),
                cc.p(currentPoint.x, currentPoint.y - 1),
                cc.p(currentPoint.x + 1, currentPoint.y),
                cc.p(currentPoint.x - 1, currentPoint.y)
            ];

            var pointsToAdd = [];

            checkPoints.forEach(function (value) {
                var tile = this.getTile(value);
                if (tile != null && !tile.getTileData().getImpassible()) {
                    pointsToAdd.push(value);
                }
            }, this);

            pointsToAdd.forEach(function (value) {
                if (!visitedPoints[value.x][value.y]) {
                    var path = new Path(currentPath.points);
                    visitedPoints[value.x][value.y] = true;
                    path.points.push(value);

                    if (path.calculateCost() <= movementRange) {
                        paths.push(path);
                    }
                }
            });

            paths.shift();

            pointsToAdd.sort(function (a, b) {
                return a.cost - b.cost;
            });

        }

        return null;
    }
});
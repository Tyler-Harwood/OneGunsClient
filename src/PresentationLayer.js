var PresentationLayer = cc.Layer.extend({
    backgroundLayer: null,
    textLayer: null,
    tileWidth: 0,
    tileHeight: 0,
    seed: 0.0,
    currentScale: null,
    player: null,
    originalLayerPosition: null,
    startPosition: null,
    tileText: null,
    mouseScroll: null,
    gameMap: null,
    validMoves: [],
    testPoints: [],
    testPoint: cc.p(0, 0),
    ctor: function (tileWidth, tileHeight, seed) {
        this._super();

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.seed = seed;

        this.init();
    },
    init: function () {
        this._super();

        this.currentScale = 1;

        this.originalLayerPosition = cc.p(0, 0);
        this.startPosition = cc.p(0, 0);
        this.mouseScroll = 1;
        this.backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 480, 480);
        this.addChild(this.backgroundLayer);

        this.gameMap = new GameMap(this.tileWidth, this.tileHeight, this.seed);
        var tileMap = this.gameMap.getTileMap();
        for (var x = 0; x < this.tileWidth; x++) {
            for (var y = 0; y < this.tileHeight; y++) {
                this.backgroundLayer.addChild(tileMap[x][y], 0);
            }
        }

        this.player = new TestPlayer();

        this.textLayer = cc.Layer.create();

        this.backgroundLayer.addChild(this.player, 1);
        this.backgroundLayer.setAnchorPoint(cc.p(0, 0));

        this.tileText = cc.LabelTTF.create("test", "Arial", "32", cc.TEXT_ALIGNMENT_LEFT);
        this.textLayer.addChild(this.tileText);
        this.textLayer.setPosition(100, 20);
        this.addChild(this.textLayer);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: this.onTouchesBegan,
            onTouchesMoved: this.onTouchesMoved,
            onTouchesEnded: this.onTouchesEnded
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: this.onMouseMove,
            onMouseScroll: this.onMouseScroll
        }, this);

        this.scheduleUpdate();
    },
    onTouchesBegan: function (touches, event) {
        var touch = touches[0];
        var test = event.getCurrentTarget();
        var pos = touch.getLocation();
        var tempPoints = test.gameMap.getPathAStar(test.testPoint, test.getCurrentTilePosition(pos), 20);
        test.testPoint = test.getCurrentTilePosition(pos);
        test.testPoints.forEach(function (wtf) {
            test.backgroundLayer.removeChild(wtf, true);
        });
        if (tempPoints != null) {
            tempPoints.forEach(function (wtf) {
                var blank_rectangle = cc.Sprite.create();
                blank_rectangle.setColor(new cc.Color(0, 91, 225, 255));
                blank_rectangle.setAnchorPoint(0, 0);
                blank_rectangle.setPosition(wtf.x * 32, wtf.y * 32);
                blank_rectangle.setTextureRect(cc.rect(0, 0, 32, 32));
                blank_rectangle.setOpacity(180);
                test.testPoints.push(blank_rectangle);
                test.backgroundLayer.addChild(blank_rectangle, 2);
            });
        }
        test.player.setPosition(test.backgroundLayer.convertToNodeSpaceAR(pos));

        test.validMoves.forEach(function (wtf) {
            test.backgroundLayer.removeChild(wtf, true);
        });

        var validMoves = test.gameMap.getValidMoves(test.getCurrentTilePosition(pos), 3);

        validMoves.forEach(function (wtf) {
            var blank_rectangle = cc.Sprite.create();
            blank_rectangle.setColor(new cc.Color(100, 20, 60, 255));
            blank_rectangle.setAnchorPoint(0, 0);
            blank_rectangle.setPosition(wtf.x * 32, wtf.y * 32);
            blank_rectangle.setTextureRect(cc.rect(0, 0, 32, 32));
            blank_rectangle.setOpacity(180);
            test.validMoves.push(blank_rectangle);
            test.backgroundLayer.addChild(blank_rectangle, 2);
        });

        test.startPosition = pos;

        return true;
    },
    onTouchesMoved: function (touches, event) {
        var touch = touches[0];
        var test = event.getCurrentTarget();
        var currentPosition = touch.getLocation();
        test.backgroundLayer.setPosition(test.originalLayerPosition.x + currentPosition.x - test.startPosition.x, test.originalLayerPosition.y + currentPosition.y - test.startPosition.y);

    },
    onTouchesEnded: function (touches, event) {
        var test = event.getCurrentTarget();
        test.originalLayerPosition = test.backgroundLayer.getPosition();
    },
    onMouseMove: function (event) {
        var test = event.getCurrentTarget();
        var tilePosition = test.getCurrentTilePosition(event.getLocation());
        var tileMap = test.gameMap;
        var tile = tileMap.getTile(tilePosition);
        var solid = "";
        if (tile != null) {
            solid = tile.getTileData().getImpassible();
        }
        test.tileText.setString("           Pos: " + tilePosition.x + ", " + tilePosition.y + " solid: " + solid);
    },
    onMouseScroll: function (event) {
        var test = event.getCurrentTarget();
        test.mouseScroll = event.getScrollY();
        test.backgroundLayer.setScale(test.currentScale += (test.mouseScroll / 1000));
    },
    getCurrentTilePosition: function (point) {
        var backgroundPosition = this.backgroundLayer.convertToNodeSpaceAR(point);

        var xPos = Math.floor(backgroundPosition.x / SPRITE_SIZE);
        var yPos = Math.floor(backgroundPosition.y / SPRITE_SIZE);

        return cc.p(xPos, yPos);
    },
    update: function (dt) {
        var test = 1;
    }
});
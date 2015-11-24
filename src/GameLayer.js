var GameLayer = cc.Layer.extend({
    backgroundLayer: null,
    textLayer: null,
    tileWidth: 0,
    tileHeight: 0,
    currentScale: null,
    pos: null,
    meh: null,
    originalPosition: null,
    startPosition: null,
    currentPosition: null,
    tileText: null,
    mousePosition: null,
    mouseScroll: null,
    ctor: function (space) {
        this._super();

    },
    init: function () {
        this._super();

        this.tileWidth = 20;
        this.tileHeight = 20;
        this.currentScale = 1;
        this.pos = cc.p(0, 0);
        this.originalPosition = cc.p(0, 0);
        this.startPosition = cc.p(0, 0);
        this.currentPosition = cc.p(0, 0);
        this.mousePosition = cc.p(0, 0);
        this.mouseScroll = 1;
        this.backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 480, 480);
        this.addChild(this.backgroundLayer);

        var tileMap = new Array(this.tileWidth);

        for (var i = 0; i < this.tileWidth; i++) {
            tileMap[i] = new Array(this.tileHeight);
        }

        for (var x = 0; x < this.tileWidth; x++) {
            for (var y = 0; y < this.tileHeight; y++) {
                tileMap[x][y] = new BackgroundTile();
                this.backgroundLayer.addChild(tileMap[x][y], 0);
                tileMap[x][y].setPosition(x * spriteDimension, y * spriteDimension);
            }
        }

        this.meh = new TestPlayer();

        this.textLayer = cc.Layer.create();

        this.backgroundLayer.addChild(this.meh, 1);
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
        test.pos = touch.getLocation();
        test.meh.setPosition(test.backgroundLayer.convertToNodeSpaceAR(test.pos));//(test.pos.x - backgroundLayer.x ) / test.currentScale, (test.pos.y - backgroundLayer.y) / test.currentScale);
        test.startPosition = test.pos;

        return true;
    },
    onTouchesMoved: function (touches, event) {
        var touch = touches[0];
        var test = event.getCurrentTarget();
        //if (lastMovePosition == null) {
        test.currentPosition = touch.getLocation();
        test.backgroundLayer.setPosition(test.originalPosition.x + test.currentPosition.x - test.startPosition.x, test.originalPosition.y + test.currentPosition.y - test.startPosition.y);
        //}
        //this.pos = touch.getLocation();
        //var test = touch.getLocation()
        //this.setPosition(test);

    },
    onTouchesEnded: function (touches, event) {
        var touch = touches[0];
        var test = event.getCurrentTarget();
        test.originalPosition = test.backgroundLayer.getPosition();
        //this.pos = touch.getLocation();
        //meh.setPosition(this.pos);
    },
    onMouseMove: function (event) {
        var test = event.getCurrentTarget();
        test.mousePosition = event.getLocation();
        var text = test.getCurrentTilePosition(test.mousePosition.x, test.mousePosition.y);
        test.tileText.setString(text);
    },
    onMouseScroll: function (event) {
        var test = event.getCurrentTarget();
        test.mouseScroll = event.getScrollY();
        test.backgroundLayer.setScale(test.currentScale += (test.mouseScroll / 1000));
    },
    getCurrentTilePosition: function (x, y) {
        var backgroundPosition = this.backgroundLayer.convertToNodeSpaceAR(cc.p(x, y));

        var xPos = Math.floor(backgroundPosition.x / spriteDimension);
        var yPos = Math.floor(backgroundPosition.y / spriteDimension);

        return "Pos: " + xPos + ", " + yPos;
    },
    update: function (dt) {
        var test = 1;
    }
});
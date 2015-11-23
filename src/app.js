var gameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var backgroundLayer;
var textLayer;
var width = 20;
var height = 20;
var scale = 1;
var pos = cc.p(0,0);
var meh;
var originalPosition = cc.p(0,0);
var startPosition = cc.p(0,0);
var currentPosition = cc.p(0,0);
var tileText;
var mousePosition = cc.p(0,0);
var mouseScroll = 1;

const spriteDimension = 32;

var getCurrentTilePosition = function (x, y) {
    var backgroundPosition = backgroundLayer.convertToNodeSpaceAR(cc.p(x,y));

    var xPos = Math.floor(backgroundPosition.x / spriteDimension);
    var yPos = Math.floor(backgroundPosition.y / spriteDimension);

    return "Pos: " + xPos + ", " + yPos;
};

var game = cc.Layer.extend({
    init: function () {
        this._super();
        backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 480, 480);
        this.addChild(backgroundLayer);

        var tileMap = new Array(width);

        for (var i = 0; i < width; i++) {
            tileMap[i] = new Array(height);
        }

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                tileMap[x][y] = new BackgroundTile();
                backgroundLayer.addChild(tileMap[x][y], 0);
                tileMap[x][y].setPosition(x * spriteDimension, y * spriteDimension);
            }
        }

        meh = new TestPlayer();

        textLayer = cc.Layer.create();

        backgroundLayer.addChild(meh, 1);
        backgroundLayer.setAnchorPoint(cc.p(0,0));

        tileText = cc.LabelTTF.create("test", "Arial", "32", cc.TEXT_ALIGNMENT_LEFT);
        textLayer.addChild(tileText);
        textLayer.setPosition(100, 20);
        this.addChild(textLayer);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: this.onMouseMove,
            onMouseScroll: this.onMouseScroll
        }, this);

        this.scheduleUpdate();
    },
    update: function (dt) {
    },
    onTouchBegan: function (touch, event) {
        pos = touch.getLocation();
        meh.setPosition(backgroundLayer.convertToNodeSpaceAR(pos));//(pos.x - backgroundLayer.x ) / scale, (pos.y - backgroundLayer.y) / scale);
        startPosition = pos;

        return true;
    },
    onTouchMoved: function (touch, event) {
        //if (lastMovePosition == null) {
        currentPosition = touch.getLocation();
        backgroundLayer.setPosition(originalPosition.x + currentPosition.x - startPosition.x, originalPosition.y + currentPosition.y - startPosition.y);
        //}
        //pos = touch.getLocation();
        //var test = touch.getLocation()
        //this.setPosition(test);

    },
    onTouchEnded: function (touch, event) {
        originalPosition = backgroundLayer.getPosition();
        //pos = touch.getLocation();
        //meh.setPosition(pos);
    },
    onMouseMove: function (event) {
        mousePosition = event.getLocation();
        tileText.setString(getCurrentTilePosition(mousePosition.x, mousePosition.y));
    },
    onMouseScroll: function (event) {
        mouseScroll = event.getScrollY();
        backgroundLayer.setScale(scale += (mouseScroll / 1000));
    }
});

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
var pos = {x: 0, y: 0};
var meh;
var originalPosition = {x: 0, y: 0};
var startPosition = {x: 0, y: 0};
var currentPosition = {x: 0, y: 0};
var layerPosition = {x: 0, y: 0};
var tileText;
var mousePosition = {x: 0, y: 0};
var mouseScroll = 1;

const spriteDimension = 64;

var getCurrentTilePosition = function (x, y) {
    var backgroundPosition = backgroundLayer.getPosition();

    var xPos = Math.floor((x - backgroundPosition.x) / (spriteDimension * scale));
    var yPos = Math.floor((y - backgroundPosition.y) / (spriteDimension * scale));

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
        backgroundLayer.setAnchorPoint({x: 0, y: 0});

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
        //cc.log("jump");
        backgroundLayer.setPosition(originalPosition.x + currentPosition.x - startPosition.x, originalPosition.y + currentPosition.y - startPosition.y);
        layerPosition = backgroundLayer.getPosition();
        tileText.setString(getCurrentTilePosition(mousePosition.x, mousePosition.y));
        backgroundLayer.setScale(scale += (mouseScroll / 1000));
        mouseScroll = 0;
        //var eyeZ = cc.Camera.getZEye();
        //camera.setEye(eyeX += dt, 0, eyeZ);
        //camera.setCenter(eyeX += dt, 0, 0);
    },
    onTouchBegan: function (touch, event) {
        pos = touch.getLocation();
        meh.setPosition((pos.x - backgroundLayer.x ) / scale, (pos.y - backgroundLayer.y) / scale);
        startPosition = pos;
        currentPosition = pos;

        return true;
    },
    onTouchMoved: function (touch, event) {
        //if (lastMovePosition == null) {
        currentPosition = touch.getLocation();

        //}
        //pos = touch.getLocation();
        //var test = touch.getLocation()
        //this.setPosition(test);

    },
    onTouchEnded: function (touch, event) {
        originalPosition = layerPosition;
        startPosition = {x: 0, y: 0};
        currentPosition = {x: 0, y: 0};
        //pos = touch.getLocation();
        //meh.setPosition(pos);
    },
    onMouseMove: function (event) {
        mousePosition = event.getLocation();
    },
    onMouseScroll: function (event) {
        mouseScroll = event.getScrollY();
    }
});

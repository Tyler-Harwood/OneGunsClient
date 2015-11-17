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
var startX;
var startY;
var mousePosition = {x: 0, y: 0};

const spriteDimension = 64;

var getCurrentTilePosition = function (x, y) {
    var backgroundPosition = backgroundLayer.getPosition();

    var currentPosition = {
        x: backgroundPosition.x + startX,
        y: backgroundPosition.y + startY
    };

    var xPos = Math.floor((x - currentPosition.x) / spriteDimension);
    var yPos = Math.floor((y - currentPosition.y) / spriteDimension);

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

        startX = ((480 - (width * spriteDimension)) / 2);
        startY = ((480 - (height * spriteDimension)) / 2);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                tileMap[x][y] = new BackgroundTile();
                backgroundLayer.addChild(tileMap[x][y], 0);
                tileMap[x][y].setPosition(x * spriteDimension + startX, y * spriteDimension + startY);
            }
        }

        meh = new TestPlayer();

        textLayer = cc.Layer.create();

        backgroundLayer.addChild(meh, 1);

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
            onMouseMove: this.onMouseMove
        }, this);

        this.scheduleUpdate();
    },
    update: function (dt) {
        //cc.log("jump");
        backgroundLayer.setPosition(originalPosition.x + currentPosition.x - startPosition.x, originalPosition.y + currentPosition.y - startPosition.y);
        layerPosition = backgroundLayer.getPosition();
        tileText.setString(getCurrentTilePosition(mousePosition.x, mousePosition.y));
        //this.setScale(scale+=dt,scale);
        //var eyeZ = cc.Camera.getZEye();
        //camera.setEye(eyeX += dt, 0, eyeZ);
        //camera.setCenter(eyeX += dt, 0, 0);
    },
    onTouchBegan: function (touch, event) {
        pos = touch.getLocation();
        meh.setPosition(pos.x - originalPosition.x, pos.y - originalPosition.y);
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
    }
});

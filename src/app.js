var gameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var backgroundLayer;
var width = 5;
var height = 5;
var eyeX = 0;
var scale = 1;
var pos = {x: 0, y: 0};
var meh;
var originalPosition = {x: 0, y: 0};
var startPosition = {x: 0, y: 0};
var currentPosition = {x: 0, y: 0};
var layerPosition = {x: 0, y: 0};

var game = cc.Layer.extend({
    init: function () {
        this._super();
        backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 480, 480);
        this.addChild(backgroundLayer);

        var tileMap = new Array(width);

        for (var i = 0; i < width; i++) {
            tileMap[i] = new Array(height);
        }

        var startX = ((480 - (width * 64)) / 2);
        var startY = ((480 - (height * 64)) / 2);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                tileMap[x][y] = new BackgroundTile();
                backgroundLayer.addChild(tileMap[x][y], 0);
                tileMap[x][y].setPosition(x * 64 + startX, y * 64 + startY);
            }
        }

        meh = new TestPlayer();

        backgroundLayer.addChild(meh, 1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        this.scheduleUpdate();
    },
    update: function (dt) {
        //cc.log("jump");
        this.setPosition(originalPosition.x+currentPosition.x-startPosition.x, originalPosition.y+currentPosition.y-startPosition.y);
        layerPosition = this.getPosition();
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

    }
});

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

var game = cc.Layer.extend({
    init: function () {
        this._super();
        backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 600, 600);
        this.addChild(backgroundLayer);

        tileMap = new Array(width);

        for (var i = 0; i < width; i++) {
            tileMap[i] = new Array(height);
        }

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                tileMap[x][y] = new test;
                backgroundLayer.addChild(tileMap[x][y], 0);
                tileMap[x][y].setPosition(x * 64, y * 64);
            }
        }

    },
    update: function (dt) {
        //this.setPosition(cc.p(eyeX-=1,0));
        this.setScale(scale+=dt,scale);
        //var eyeZ = cc.Camera.getZEye();
        //camera.setEye(eyeX += dt, 0, eyeZ);
        //camera.setCenter(eyeX += dt, 0, 0);
    },
    onEnter:function () {
        this._super();
        this.scheduleUpdate();
    }
});

var test = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("assets/target.png");

    }
});

//
//var gameScene = cc.Scene.extend({
//    onEnter: function () {
//        this._super();
//        var gameLayer = new game();
//        gameLayer.init(5, 3);
//        this.addChild(gameLayer);
//    }
//});
//
//var backgroundLayer;
//var tileMap;
//var eyeX = 100;
//var camera;
//
//var game = cc.Layer.extend({
//    init: function (width, height) {
//        this._super();
//
//        cc.eventManager.addListener(cc.EventListener.create({
//            event: cc.EventListener.TOUCH_ONE_BY_ONE,
//            swallowTouches: true,
//            onTouchBegan: function () {
//                eyeX -= 10;
//            }
//        }), this);
//
//        backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 320, 480);
//
//        tileMap = new Array(width);
//
//        for (var i = 0; i < width; i++) {
//            tileMap[i] = new Array(height);
//        }
//
//        for (var x = 0; x < width; x++) {
//            for (var y = 0; y < height; y++) {
//                tileMap[x][y] = new test;
//                backgroundLayer.addChild(tileMap[x][y], 0);
//                tileMap[x][y].setPosition(x * 32, y * 32);
//            }
//        }
//        this.addChild(backgroundLayer);
//        camera = this.getCamera();
//        var eyeZ = cc.Camera.getZEye();
//        camera.setEye(eyeX, 0, eyeZ);
//        camera.setCenter(eyeX, 0, 0);
//
//        //setTimeout(function () {
//        //    for (var x = 0; x < 10; x++) {
//        //        for (var y = 0; y < 10; y++) {
//        //            backgroundLayer.removeChild(tileMap[x][y]);
//        //        }
//        //    }
//        //
//        //}, 3000);
//    },
//    update: function (dt) {
//        var eyeZ = cc.Camera.getZEye();
//        camera.setEye(eyeX += dt, 0, eyeZ);
//        camera.setCenter(eyeX += dt, 0, 0);
//    },
//    onEnter:function () {
//        this._super();
//        this.scheduleUpdate();
//    }
//});
//
//var test = cc.Sprite.extend({
//    ctor: function () {
//        this._super();
//        this.initWithFile("assets/target.png");
//
//    }
//});
//

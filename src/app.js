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
        backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 480, 480);
        this.addChild(backgroundLayer);

        var tileMap = new Array(width);

        for (var i = 0; i < width; i++) {
            tileMap[i] = new Array(height);
        }

        var startX = ((480-(width*64))/2);
        var startY = ((480-(height*64))/2);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                tileMap[x][y] = new BackgroundTile();
                backgroundLayer.addChild(tileMap[x][y], 0);
                tileMap[x][y].setPosition(x * 64 + startX, y * 64 + startY);
            }
        }

    },
    update: function (dt) {
        //this.setPosition(cc.p(eyeX-=1,0));
        //this.setScale(scale+=dt,scale);
        //var eyeZ = cc.Camera.getZEye();
        //camera.setEye(eyeX += dt, 0, eyeZ);
        //camera.setCenter(eyeX += dt, 0, 0);
    },
    onEnter:function () {
        this._super();
        this.scheduleUpdate();
    }
});

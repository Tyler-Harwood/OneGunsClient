var gameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var backgroundLayer;

var game = cc.Layer.extend({
    init: function () {
        this._super();
        backgroundLayer = cc.LayerColor.create(new cc.Color(40, 40, 40, 255), 320, 480);
        this.addChild(backgroundLayer);
        var targets = [];
        for (var i = 0; i < 10; i++) {
            targets[i] = cc.Sprite.create("assets/target.png");
            backgroundLayer.addChild(targets[i], 0);
            targets[i].setPosition(Math.random() * 320, Math.random() * 480);
        }

        setTimeout(function () {
            backgroundLayer.removeChild(targets);
        }, 3000);
    }
});


var gameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var presentationLayer = new PresentationLayer(10,10, 1);
        this.addChild(presentationLayer);
    }
});

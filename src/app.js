var gameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var presentationLayer = new PresentationLayer();
        this.addChild(presentationLayer);
    }
});

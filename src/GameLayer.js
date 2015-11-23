var GameLayer = cc.Layer.extend({
    backgroundLayer:null,
    textLayer:null,
    width:null,
    height:null,
    scale:null,
    pos:null,
    meh:null,
    originalPosition:null,
    startPosition:null,
    currentPosition:null,
    tileText:null,
    mousePosition:null,
    mouseScroll:null,
    ctor: function () {
        this._super();
        this.initWithFile("assets/target.png");

    },
    init: function () {
        backgroundLayer;
        textLayer;
        width = 20;
        height = 20;
        scale = 1;
        pos = cc.p(0, 0);
        meh;
        originalPosition = cc.p(0, 0);
        startPosition = cc.p(0, 0);
        currentPosition = cc.p(0, 0);
        tileText;
        mousePosition = cc.p(0, 0);
        mouseScroll = 1;
    }
});
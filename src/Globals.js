const SPRITE_SIZE = 32;

var Randomizer = {
    seed:null,
    random1: function random() {
        if (this.seed == null) {
            this.seed = Math.random();
        }
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
};

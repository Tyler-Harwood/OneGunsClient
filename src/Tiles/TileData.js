TileData = function() {
    this.impassible = false;
};

TileData.prototype.getImpassible = function() {
    return this.impassible;
};

TileData.prototype.setImpassible = function(impassible) {
    this.impassible = impassible;
};
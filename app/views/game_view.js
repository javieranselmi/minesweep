let TileView = require("./tile_view");
let _ = require("lodash");



module.exports = function(game) {
    return {
        end: game.board.end,
        tiles: _.map(game.board.tiles, (tile) => {return TileView(tile)})
    };
};
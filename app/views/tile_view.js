let TileView = require("tile_view");

module.exports = function(game) {
    return {
        end: game.board.end,
        tiles: _.map(game.board.tiles, (tile) => {return TileView(tile)});
    };
};
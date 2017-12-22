let ContentType = require('../constants/content_type');
let TileState = require('../constants/tile_state');

module.exports = function(game) {
    return {
        end: game.board.end,
        tiles: _.map(game.board.tiles, (tile) => {return TileView(tile)});
    };
};
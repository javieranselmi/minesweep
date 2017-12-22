let ContentType = require('../constants/content_type');
let TileState = require('../constants/tile_state');

module.exports = function(tile) {
    return {
        top: tile.top,
        left: tile.left,
        content: tile.state === TileState.hidden ? ContentType.unknown : tile.content,
        realContent: tile.content, //TODO: Remove. This is for debug only
        state: tile.state,
        mineProximityValue: tile.mineProximityValue(),

    };
};
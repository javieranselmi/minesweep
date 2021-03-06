/**
 * Created by javieranselmi on 12/21/17.
 */
let ContentType = require('../constants/content_type');
let TileState = require('../constants/tile_state');
let _ = require("lodash");

function Tile(top, left, content, board) {

    this.top = top;
    this.left = left;
    this.content = content || ContentType.empty;
    this.board = board;
    this.state = TileState.hidden
};

function validate(top, left, content) {
    //Validations for the constructor function values. Will do if I have time
}

Tile.prototype.hide = function() {
    this.state = TileState.hidden;
};

Tile.prototype.show = function() {
    this.state = TileState.visible;
};

Tile.prototype.isHidden = function() {
    return (this.state === TileState.hidden);
};

Tile.prototype.isMine = function() {
    return (this.content === ContentType.mine);
};

Tile.prototype.isSafe = function() {
    return (this.content === ContentType.empty);
};

Tile.prototype.is = function(tile) {
    return (this.top === tile.top && this.left === tile.left);
};

Tile.prototype.mineProximityValue = function() {
    return this.board.neighboursWithMinesFor(this).length;
};

Tile.prototype.clicked = function() {
    if (this.isMine()) {
        //Tile had a mine. Game ends.
        this.board.end = true;
        return true;
    } else {
        this.show();
        if (this.mineProximityValue() === 0) {
            _.each(this.board.neighboursFor(this), (neighbour) => {
                if (neighbour.isHidden()) {
                    neighbour.clicked();
                }
            });
        }
    }
};

module.exports = Tile;
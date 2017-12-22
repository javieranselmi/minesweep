/**
 * Created by javieranselmi on 12/21/17.
 */

let Tile = require("./tile");
let _ = require("lodash");

function Board(height, width, time) {

    this.height = height;
    this.width = width;
    this.time = time;
    this.tiles = [];
    this.end = false;

    this.initializeTiles(height, width);
};

function validate(height, width, time) {
    //Validations for the constructor function values. Will do if I have time
}

Board.prototype.initializeTiles = function(height, width) {
    _.times(height, (col) => {
        _.times(width, (row) => {
            this.tiles.push(new Tile(col, row, this));
        })
    });
};

Board.prototype.neighboursWithMinesFor = function(tile) {
    return _.filter(this.neighboursFor(tile), (tile) => {
        return tile.isMine();
    });
};

Board.prototype.neighboursFor = function(tile) {
    let adjacentTopValues =  [tile.top + 1, tile.top - 1];
    let adjacentLeftValues = [tile.left + 1, tile.left - 1];

    return this.tiles.filter((tile) => {
        return (_.includes(adjacentTopValues, tile.top) || _.includes(adjacentLeftValues, tile.left));
    });
};

Board.prototype.tileClicked = function(tile) {
    return tile.clicked();
};

module.exports = Tile;
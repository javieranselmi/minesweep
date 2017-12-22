/**
 * Created by javieranselmi on 12/21/17.
 */

let Tile = require("./tile");
let _ = require("lodash");
let ContentType = require('../constants/content_type');

function Board(height, width, time, mines) {

    this.height = height;
    this.width = width;
    this.time = time;
    this.tiles = [];
    this.end = false;

    this.initializeTiles(height, width, mines);
};

function validate(height, width, time) {
    //Validations for the constructor function values. Will do if I have time
}

Board.prototype.initializeTiles = function(height, width, mines) {

    let totalTiles = height * width;

    let mineArray = _.fill(Array(Number(mines)), ContentType.mine);
    let emptyArray = _.fill(Array(totalTiles - mines), ContentType.empty);

    let tileContents = _.shuffle(_.concat(mineArray, emptyArray));

    _.times(height, (col) => {
        _.times(width, (row) => {
            this.tiles.push(new Tile(col, row, tileContents.pop(), this));
        })
    });
};

Board.prototype.neighboursWithMinesFor = function(tile) {

    return _.filter(this.neighboursFor(tile), (tile) => {
        return tile.isMine();
    });
};

Board.prototype.neighboursFor = function(tile) {
    let adjacentTopValues =  [tile.top + 1, tile.top, tile.top - 1];
    let adjacentLeftValues = [tile.left + 1, tile.left, tile.left - 1];

    return this.tiles.filter((potentialNeighbourTile) => {
        return (_.includes(adjacentTopValues, potentialNeighbourTile.top) &&
        _.includes(adjacentLeftValues, potentialNeighbourTile.left) &&
        !tile.is(potentialNeighbourTile));
    });
};

Board.prototype.tileClicked = function(tile) {
    return tile.clicked();
};

Board.prototype.tileClickedAt = function(top, left) {
    let tile = _.find(this.tiles, (tile) => {
        return (tile.top === top && tile.left === left)
    });
    if (tile) {
        return this.tileClicked(tile);
    } else {
        throw new Error('Tile does not exist.');
    }

};

module.exports = Board;
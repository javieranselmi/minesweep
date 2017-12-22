let Board = require("./board");

let currentGame = new Board(2, 2, 300, 1);

module.exports = {
    board: currentGame,
    reset: function(width, height, time, mines) {
        console.log('creating new board of dimensions', width, height);
        currentGame = new Board(width, height, time, mines);
        this.board = currentGame;
    },
    tileClickedAt: function(top,left) {
        currentGame.tileClickedAt(top, left);
    }
};
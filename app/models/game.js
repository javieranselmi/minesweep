let Board = require("./board");

let currentGame = new Board(2, 2, 300);

module.exports = {
    board: currentGame,
    reset: function() {
        currentGame = new Board(2, 2, 300);
        this.board = currentGame;
    },
    tileClickedAt: function(top,left) {
        currentGame.tileClickedAt(top, left);
    }
};
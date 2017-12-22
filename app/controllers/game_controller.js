let game = require("../models/game");
let gameView = require("../views/game_view");

module.exports = {
    initialize: function(req, res, next) {
        game.reset(req.body.width, req.body.height, req.body.time, req.body.mines);
        res.status(200).json(gameView(game));
    },
    tileClicked: function(req, res, next) {
        game.tileClickedAt(req.body.top, req.body.left);
        res.status(200).json(gameView(game));
    }
}
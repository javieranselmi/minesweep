var express = require('express');
var gameController = require('../app/controllers/game_controller');
var router = express.Router();

router.post('/game', gameController.initialize);
router.put('/game/tile', gameController.tileClicked);

module.exports = router;

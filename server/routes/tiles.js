const express = require('express');
const router = express.Router();

const {
	getAllTiles,
	createTile,
	getTile,
	updateTile,
	deleteTile
} = require('../controllers/tiles');

// index routes
router.get('/', getAllTiles);
router.post('/', createTile);

// single tile routes
router.get('/:id', getTile);
router.patch('/:id', updateTile);
router.delete('/:id', deleteTile);

module.exports = router;

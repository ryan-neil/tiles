const Tile = require('../models/Tile');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/error');

// get all tiles logic
const getAllTiles = asyncWrapper(async (req, res) => {
	const tiles = await Tile.find({});
	res.status(200).json({ tiles });
});

// create tile logic
const createTile = asyncWrapper(async (req, res) => {
	const tile = await Tile.create(req.body);
	res.status(201).json({ tile });
});

// get single tile logic
const getTile = asyncWrapper(async (req, res, next) => {
	const { id: tileID } = req.params;
	const tile = await Tile.findOne({ _id: tileID });

	if (!tile) {
		return next(createCustomError(`No tile with id : ${tileID}`, 404));
	}

	res.status(200).json({ tile });
});

// delete tile logic
const deleteTile = asyncWrapper(async (req, res, next) => {
	const { id: tileID } = req.params;

	const tile = await Tile.findOneAndDelete({ _id: tileID });

	if (!tile) {
		return next(createCustomError(`No tile with id : ${tileID}`, 404));
	}

	res.status(200).json({ tile });
});

// update tile logic
const updateTile = asyncWrapper(async (req, res, next) => {
	const { id: tileID } = req.params;

	const tile = await Tile.findOneAndUpdate({ _id: tileID }, req.body, {
		new: true,
		runValidators: true
	});

	if (!tile) {
		return next(createCustomError(`No tile with id : ${tileID}`, 404));
	}

	res.status(200).json({ tile });
});

// export controller functions
module.exports = {
	getAllTiles,
	createTile,
	getTile,
	updateTile,
	deleteTile
};

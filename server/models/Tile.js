const mongoose = require('mongoose');

const TileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Must provide name' ],
		trim: true,
		maxlength: [ 200, 'Name can not exceed more than 200 characters' ]
	},
	completed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Tile', TileSchema);

const mongoose = require('mongoose');

const bidderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	rating: { type: Number, required: true }
});

module.exports = mongoose.model('Bidder', productSchema);

const mongoose = require('mongoose');

const bidderSchema = mongoose.Schema({
	rating: { type: Number, required: true },
	location: { type: String, required: true },
	country: { type: String, required: true },
});

module.exports = mongoose.model('Bidder', productSchema);

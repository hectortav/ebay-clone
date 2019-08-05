const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	category: { type: String, required: true },
	location: { type: String, required: true },
	country: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);

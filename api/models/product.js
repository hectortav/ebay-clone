const mongoose = require('mongoose');

/*const bidderSchema = mongoose.Schema({
	rating: { type: Number, required: true },
	location: { type: String, required: true },
	country: { type: String, required: true },
});

const bidSchema = mongoose.Schema({
	bidder: [bidderSchema],
	time: {type: Date, required: true },
	amount: {type: Number, required: true },
});*/
const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	category: { type: String, required: true },
	currently: { type: Number, required: true },
	first_bid: { type: Number, required: true },
	no_bids: { type: Number, required: true },
	//bids: [bidderSchema]
	/*bids: {
		type: Map,
		of: [bidSchema]
		}*/
});

module.exports = mongoose.model('Product', productSchema);
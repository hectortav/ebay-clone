const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: { type: mongoose.Schema.Types.ObjectId, red: 'Product' , required: true},
	currently: { type: Number, required: true },
	first_bid: { type: Number},
	no_bids: { type: Number, default: 0 },
	started: {type: Date, required: true },
	ends: {type: Date, required: true },
	description: { type: String },
	seller: { type: mongoose.Schema.Types.ObjectId, red: 'Bidder' , required: true},

	buy_price: { type: Number},
	bids: {
		type: Map,
		of: mongoose.Schema.Types.ObjectId,
		red: 'Bid'
	}

});

module.exports = mongoose.model('Auction', auctionSchema);

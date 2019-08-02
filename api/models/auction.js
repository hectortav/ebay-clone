const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: { type: mongoose.Schema.Types.ObjectId, red: 'Product' , required: true},
	currently: { type: Number, required: true },
	first_bid: { type: Number},
	no_bids: { type: Number, default: 0 }
});

module.exports = mongoose.model('Auction', auctionSchema);

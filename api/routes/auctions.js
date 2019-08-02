const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Auctions were Fetched'
	});
});

router.post('/', (req, res, next) => {
	const auction = {
		productId: req.body.productId,
		quantity: req.body.quantity
	};
	res.status(201).json({
		message: 'Auction Created',
		auction: auction
	});
});

router.get('/:auctionId', (req, res, next) => {
	res.status(200).json({
		message: 'Auction details',
		auctionId: req.params.auctionId
	});
});

router.delete('/:auctionId', (req, res, next) => {
	res.status(200).json({
		message: 'Auction Deleted',
		auctionId: req.params.auctionId
	});
});

module.exports = router;

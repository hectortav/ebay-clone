const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');


router.get('/', (req, res, next) => {
	Auction.find().select('name _id currently first_bid no_bids').exec().then(docs => {
		res.status(200).json({
			count: docs.length,
			auctions: docs.map(doc => {
				return {
					_id: doc._id,
					name: doc.name,
					currently: doc.currently,
					first_bid: doc.first_bid,
					no_bids: doc.no_bids,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/auctions/' + doc._id
					}
				}
			})

		});
	}).catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

router.post('/', (req, res, next) => {
	Product.findById(req.body.nameId)
	.then(name => {
		if (!name) {
			return res.status(404).json({
				message: "Product Not Found"
			});
		}
		const auction = new Auction({
			_id: mongoose.Types.ObjectId(),
			name: req.body.nameId,
			currently: req.body.currently,
			first_bid: req.body.first_bid,
			no_bids: req.body.no_bids
		});
		return auction.save();
	})
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'Auction Saved',
			createdAuction: {
				_id: result._id,
				name: result.name,
				currently: result.currently,
				first_bid: result.first_bid,
				no_bids: result.no_bids
			},
			request: {
				type: 'GET',
				url: 'http://localhost:3000/auctions/' + result._id
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.get('/:auctionId', (req, res, next) => {
	Auction.findById(req.params.auctionId)
	.exec()
	.then(auction => {
		if (!auction) {
			return res.status(404).json({
				message: 'Auction Not Found'
			});
		}
		res.status(200).json({
			auction: auction,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/auctions/'
			}
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

router.delete('/:auctionId', (req, res, next) => {
	Auction.remove({ _id: req.params.auctionId })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Auction Deleted',
			request: {
				type: "POST",
				url: 'http://localhost:3000/auctions/',
				body: { nameId: 'ID', currently: 'NUMBER', first_bid: 'NUMBER', no_bids: 'NUMBER' }
			}
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;

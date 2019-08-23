const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');

router.get('/', (req, res, next) => {
	Auction.find().select('_id name category location country currently first_bid no_bids started ends description latitude longitude seller bids').exec().then(docs => {
		res.status(200).json({
			count: docs.length,
			auctions: docs.map(doc => {
				return {
					_id: doc._id,
					name: doc.name,
					category: doc.category,
					location: doc.location,
					country: doc.country,
					currently: doc.currently,
					first_bid: doc.first_bid,
					no_bids: doc.no_bids,
					started: doc.started,
					ends: doc.ends,
					description: doc.description,
					latitude: doc.latitude,
					longitude: doc.longitude,
					seller: doc.seller,
					bids: doc.bids,
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

router.get('/user/:userId', (req, res, next) => {
	Auction.find({ seller: req.params.userId })
		.exec()
		.then(auction => {
			if (auction.length < 1) {
				return res.status(404).json({
					message: 'No Auctions Found'
				});
			}
			res.status(200).json({
				count: auction.length,
				auctions: auction.map(doc => {
					return {
						_id: doc._id,
						name: doc.name,
						category: doc.category,
						location: doc.location,
						country: doc.country,
						currently: doc.currently,
						first_bid: doc.first_bid,
						no_bids: doc.no_bids,
						started: doc.started,
						ends: doc.ends,
						description: doc.description,
						latitude: doc.latitude,
						longitude: doc.longitude,
						seller: doc.seller,
						bids: doc.bids,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/auctions/' + doc._id
						}
					}
				})

			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

router.post('/', (req, res, next) => {
	User.findById(req.body.seller)
		.then(user => {
			if (!user) {
				return res.status(404).json({
					message: "User Not Found"
				});
			}
			const auction = new Auction({
				_id: mongoose.Types.ObjectId(),
				name: req.body.name,
				category: req.body.category,
				location: req.body.location,
				country: req.body.country,
				currently: req.body.currently,
				first_bid: req.body.first_bid,
				no_bids: req.body.no_bids,
				started: req.body.started,
				ends: req.body.ends,
				description: req.body.description,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				seller: req.body.seller,
				bids: req.body.bids
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
					category: result.category,
					location: result.location,
					country: result.country,
					currently: result.currently,
					first_bid: result.first_bid,
					no_bids: result.no_bids,
					started: result.started,
					ends: result.ends,
					description: result.description,
					latitude: result.latitude,
					longitude: result.longitude,
					seller: result.seller,
					bids: result.bids
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
					body: { productId: 'ID', currently: 'NUMBER', first_bid: 'NUMBER', no_bids: 'NUMBER' }
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

router.put('/:auctionId', (req, res, next) => {
	const id = req.params.auctionId;
	Auction.update({ _id: id }, { $set: {
		name: req.body.name,
		category: req.body.category,
		location: req.body.location,
		country: req.body.country,
		currently: req.body.currently,
		first_bid: req.body.first_bid,
		no_bids: req.body.no_bids,
		started: req.body.started,
		ends: req.body.ends,
		description: req.body.description,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		seller: req.body.seller,
		bids: req.body.bids
	} })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Auction updated',
				request: {
					type: 'GET',
					url: 'http://localhost:3000/auctions/' + id
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

module.exports = router;

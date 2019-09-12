const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');
const Bid = require('../models/bid');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
	var today = new Date();
	const page = parseInt(req.query.page) || 1;
	const pageSize = 2;

	var query = {
		started: {
			"$ne": undefined,
			"$lt": today
		},
		ends: {
			"$ne": undefined,
			"$gte": today
		}
	};

	if (req.query.category) {
		query.category = req.query.category;
	}

	if (req.query.price) {
		query.currently = { "$lt": parseInt(req.query.price) };
	}

	if (req.query.location) {
		query.$or = [
			{ loaction: { "$regex": req.query.location, "$options": "i" } },
			{ country: { "$regex": req.query.location, "$options": "i" } }
		]
	}

	if (req.query.text) {
		query.$text = { $search: req.query.text };
	}

	Auction.find(query)
		.skip((pageSize * page) - pageSize)
		.limit(pageSize)
		.select('_id name category location country currently first_bid no_bids started ends description latitude longitude seller bids')
		.exec().then(docs => {
			res.status(200).json({
				count: docs.length,
				pageN: page,
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
							url: 'https://localhost:3000/auctions/' + doc._id
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

// router.get('/', (req, res, next) => {
// 	var today = new Date();
// 	var length;

// 	Auction.find().select('_id name category location country currently first_bid no_bids started ends description latitude longitude seller bids')
// 		.exec()
// 		.then(docs => {
// 			length = docs.length;
// 			const response = {
// 				count: length,
// 				auctions: docs.map(doc => {
// 					//console.log(doc.started + "\n<\n" + today + "\n<\n" + doc.ends + "\n\n");
// 					if (doc.started != undefined || today >= doc.started) {
// 						if (today < doc.ends) {
// 							return {
// 								_id: doc._id,
// 								name: doc.name,
// 								category: doc.category,
// 								location: doc.location,
// 								country: doc.country,
// 								currently: doc.currently,
// 								first_bid: doc.first_bid,
// 								no_bids: doc.no_bids,
// 								started: doc.started,
// 								ends: doc.ends,
// 								description: doc.description,
// 								latitude: doc.latitude,
// 								longitude: doc.longitude,
// 								seller: doc.seller,
// 								bids: doc.bids,
// 								request: {
// 									type: 'GET',
// 									url: 'http://localhost:3000/auctions/' + doc._id
// 								}
// 							}
// 						}
// 						else
// 							length--;
// 					}
// 					else
// 						length--;
// 				})

// 			};
// 			response.count = length;
// 			res.status(200).json(response);
// 		}).catch(err => {
// 			res.status(500).json({
// 				error: err
// 			});
// 		});
// });

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
			Category.find({ name: req.body.category })
				.then(category => {
					if (!category) {
						return res.status(404).json({
							message: "Category Not Found"
						});
					}
				});
		})
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
	auction.save()
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

router.get('/:auctionId/bids', (req, res, next) => {
	var return_array = [];
	var return_bid;

	Auction.findById(req.params.auctionId)
		.exec()
		.then(auction => {
			if (!auction) {
				return res.status(404).json({
					message: 'Auction Not Found'
				});
			}
			var arrayLength = auction.bids.length;
			var last = auction.bids[arrayLength - 1]._id;
			var length = 0;
			for (var i = 0; i < arrayLength; i++) {
				Bid.findById(auction.bids[i])
					.select('_id auction bidder amount time')
					.exec()
					.then(bid => {
						if (!bid) {
							return res.status(404).json({
								message: 'Bid Not Found'
							});
						}
						return_bid = {
							_id: bid._id,
							auction: bid.auction,
							bidder: bid.bidder,
							amount: bid.amount,
							time: bid.time
						};

						return_array.push(return_bid);
						length++;
						if (length == arrayLength) {
							return_array.sort(function (a, b) {
								a = new Date(a.time);
								b = new Date(b.time);
								return a > b ? -1 : a < b ? 1 : 0;
							});
							return res.status(200).json({
								bids: return_array
							});
						}

						console.log(return_array);
					})
					.catch(err => {
						res.status(500).json({
							error: err
						});
					});
			}
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

	Auction.findById(req.params.auctionId)
		.exec()
		.then(auction => {
			if (!auction) {
				return res.status(404).json({
					message: 'Auction Not Found'
				});
			}
			const temp_auction = new Auction({
				_id: auction._id,
				name: auction.name,
				category: auction.category,
				location: auction.location,
				country: auction.country,
				currently: auction.currently,
				first_bid: auction.first_bid,
				no_bids: auction.no_bids,
				started: auction.started,
				ends: auction.ends,
				description: auction.description,
				latitude: auction.latitude,
				longitude: auction.longitude,
				seller: auction.seller,
				bids: auction.bids
			});

			if (req.body.name)
				temp_auction.name = req.body.name;
			/*var arrayLength = req.body.category.length;
			for (var i = 0; i < arrayLength; i++) {
				Category.find({ name: req.body.category[i] })
					.then(category => {
						console.log(category);
						if (!category) {
							return res.status(404).json({
								message: "Category Not Found"
							});
						}
						temp_auction.category[i] = req.body.category[i];
				});
			}*/
			if (req.body.category) {
				var i = req.body.category.length;
				temp_auction.category.length = 0
				while (i--) temp_auction.category[i] = req.body.category[i];

				//console.log(req.body.category);
				//console.log(temp_auction.category);
			}
			if (req.body.location)
				temp_auction.location = req.body.location;
			if (req.body.country)
				temp_auction.country = req.body.country;
			if (req.body.currently)
				temp_auction.currently = req.body.currently;
			if (req.body.first_bid)
				temp_auction.first_bid = req.body.first_bid;
			if (req.body.no_bids)
				temp_auction.no_bids = req.body.no_bids;
			if (req.body.started)
				temp_auction.started = req.body.started;
			if (req.body.ends)
				temp_auction.ends = req.body.ends;
			if (req.body.description)
				temp_auction.description = req.body.description;
			if (req.body.latitude)
				temp_auction.latitude = req.body.latitude;
			if (req.body.longitude)
				temp_auction.longitude = req.body.longitude;
			if (req.body.seller)
				temp_auction.seller = req.body.seller;
			if (req.body.bids)
				temp_auction.bids = req.body.bids;

			Auction.update({ _id: id }, {
				$set: {
					name: temp_auction.name,
					category: temp_auction.category,
					location: temp_auction.location,
					country: temp_auction.country,
					currently: temp_auction.currently,
					first_bid: temp_auction.first_bid,
					no_bids: temp_auction.no_bids,
					started: temp_auction.started,
					ends: temp_auction.ends,
					description: temp_auction.description,
					latitude: temp_auction.latitude,
					longitude: temp_auction.longitude,
					seller: temp_auction.seller,
					bids: temp_auction.bids
				}
			})
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
});

module.exports = router;

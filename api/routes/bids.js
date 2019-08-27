const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');
const Bid = require('../models/bid');

router.post('/', (req, res, next) => {
	Auction.findById(req.body.auction)
		.exec()
		.then(auction => {
			if (!auction) {
				return res.status(404).json({
					message: 'Auction Not Found'
				});
            }
            else {
                User.findById(req.body.bidder)
                .then(user => {
                    if (!user) {
                        return res.status(404).json({
                            message: "User Not Found"
                        });
                    }
                    if (req.body.amount <= auction.currently) {
                        return res.status(404).json({
                            message: "Amount <= Current Price"
                        });
                    }
                    const bid = new Bid({
                        _id: new mongoose.Types.ObjectId(),
                        bidder: req.body.bidder,
                        time: req.body.time,
                        amount: req.body.amount
                        });
                        bid.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'Bid Created'
                            });
                            auction.bids.push(bid);
                            auction.save();
                            res.status(200).json({
                                auction: auction,
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/auctions/'
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
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

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');
const Bid = require('../models/bid');

router.get('/:bidId', (req, res, next) => {
    Bid.findById(req.params.bidId)
	    .select('_id auction bidder amount time')
		.exec()
		.then(bid => {
			if (!bid) {
				return res.status(404).json({
					message: 'Bid Not Found'
				});
			}
			res.status(200).json({
                _id: bid._id,
                auction: bid.auction,
                bidder: bid.bidder,
                amount: bid.amount,
                time: bid.time
            });
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

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
                    if (req.body.time < auction.started) {
                        return res.status(404).json({
                            message: "Time < Auction Start"
                        });
                    }
                    if (req.body.time > auction.ends) {
                        return res.status(404).json({
                            message: "Time > Auction End"
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
                            auction.currently = req.body.amount;
                            if (!auction.first_bid) {
                                auction.first_bid = _id;
                            }
                            auction.bids.push(_id);
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

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
    const bid = new Bid({
        _id: new mongoose.Types.ObjectId(),
        auction: req.body.auction,
        bidder: req.body.bidder,
        time: req.body.time,
        amount: req.body.amount
        });
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
                        bid.save()
                        .then(result => {
                            console.log(result);
                            auction.currently = req.body.amount;
                            auction.no_bids++;
                            auction.bids = auction.bids || [];
                            auction.bids.push(bid._id);
                            auction.save();
                            res.status(201).json({
                                message: 'Bid Created'
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

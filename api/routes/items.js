const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');
const Bid = require('../models/bid');
const Category = require('../models/category');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

router.post('/', (req, res, next) => {
    console.log(req.body);
    var seller_id;
    var auction_id;

    /*return res.status(200).json({
        message: req.body.Items.Item[0].Number_of_Bids//req.body.Items.Item[0].Bids[0].Bid[0].Bidder[0].UserID
    });*/
    var arrayLength = req.body.Items.Item.length;
    for (var i = 0; i < arrayLength; i++)
    {
        console.log(req.body.Items.Item[i]);
        Auction.find({ name: req.body.Items.Item[i].Name})
            .exec()
            .then( auction => {
                if (auction.length >= 1) {
                    return res.status(409).json({
                        message: 'Auction Exists'
                    });
                }
            });
        User.find({ username: req.body.Items.Item[i].Seller[0].UserID})
            .exec()
            .then( user => {
                if (user.length < 1) {
                    username = String(req.body.Items.Item[i].Seller[0].UserID);
                    rate = Number(req.body.Items.Item[i].Seller[0].Rating);
                    bcrypt.hash(username, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const seller = new User({
                                _id: new mongoose.Types.ObjectId(),
                                username: username,
                                password: hash, 	//add check for confirm pass
                                firstname: username,
                                lastname: username,
                                email: username,
                                phone: "555555555",
                                address: username,
                                city: username,
                                afm: "1010101010",
                                rating: rate,
                                role: "user"
                            });
                            seller.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User Created'
                                });
                            }).catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                            seller_id = seller._id;
                        }
                    });
                }
                else {
                    seller_id = user._id;
                }
                console.log("\n\nIMPORTANT: " + req.body.Items.Item[i].Name + " \n\n");
                const auction = new Auction({
                    _id: new mongoose.Types.ObjectId(),
                    name: String(req.body.Items.Item[i].Name),
                    category: req.body.Items.Item[i].Category,
                    location: String(req.body.Items.Item[i].Location),
                    country: String(req.body.Items.Item[i].Country),
                    currently: Number(req.body.Items.Item[i].Currently),
                    first_bid: Number(req.body.Items.Item[i].First_Bid),
                    no_bids: req.body.Items.Item[i].Number_Of_Bids,
                    started: req.body.Items.Item[i].Started,
                    ends: req.body.Items.Item[i].Ends,
                    description: String(req.body.Items.Item[i].Description),
                    latitude: Number(req.body.Items.Item[i].Latitude),
                    Longitude: Number(req.body.Items.Item[i].Longitude),
                    buy_price: req.body.Items.Item[i].Buy_Price,
                    seller: seller_id
        
                });
                auction_id = auction._id;
                auction.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Auction Created'
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                var bidsLength = req.body.Items.Item[i].Bids.Bid.lenght;
                for (var j = 0; j < bidsLength; j++)
                {
                    var bidder_id;
                    User.find({ username: req.body.Items.Item[i].Bids[0].Bid[j].Bidder[0].UserID})
                    .exec()
                    .then( user => {
                        if (user.length < 1) {
                            username = String(req.body.Items.Item[i].Bids[0].Bid[j].Bidder[0].UserID);
                            rate = Number(req.body.Items.Item[i].Bids[0].Bid[j].Bidder[0].Rating);
                            bcrypt.hash(username, 10, (err, hash) => {
                                if (err) {
                                    return res.status(500).json({
                                        error: err
                                    });
                                } else {
                                    const bidder = new User({
                                        _id: new mongoose.Types.ObjectId(),
                                        username: username,
                                        password: hash, 	//add check for confirm pass
                                        firstname: username,
                                        lastname: username,
                                        email: username,
                                        phone: "555555555",
                                        address: username,
                                        city: String(req.body.Items.Item[i].Bids[0].Bid[j].Bidder[0].Location),
                                        afm: "1010101010",
                                        rating: rate,
                                        role: "user"
                                    });
                                    bidder.save()
                                    .then(result => {
                                        res.status(201).json({
                                            message: 'User Created'
                                        });
                                    }).catch(err => {
                                        res.status(500).json({
                                            error: err
                                        });
                                    });
                                    bidder_id = bidder._id;
                                }
                            });
                        }
                        else {
                            bidder_id = user._id;
                        }
                        var bid = new Bid({
                            _id: new mongoose.Types.ObjectId(),
                            auction: auction_id,
                            bidder: bidder_id,
                            time: req.body.Items.Item[i].Bids.Bid[j].Time,
                            amount: req.body.Items.Item[i].Bids.Bid[j].Amount
                        });
                    })
                }
            })
    }
	
});

module.exports = router;

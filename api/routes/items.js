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

function addToAuct(auction_id, bid_id, req, res, next)
{
    console.log("~~~Add Bid To Auction~~~");

    Auction.findById(auction_id)
            .exec()
            .then( auction => {
                if (!auction)
                {
                    console.log("~~~No~~~");
                    //addToAuct(auction_id, bid_id, req, res, next);
                }
                if (auction.length < 1) {
                    console.log("~~~No~~~");
                    //addToAuct(auction_id, bid_id, req, res, next);
                }
                else {
                    console.log("~~~Yes~~~");
                    auction.bids = auction.bids || [];
                    auction.bids.push(bid_id);
                    auction.save()
                        .then(result => {
                        res.status(201).json({
                            message: 'Bid Added'
                        });
                    });
                }
            });
}

function makeBid(this_bid, auction_id, req, res, next) {
    var num;
    var bidder_id;
    User.find({ username: this_bid.Bidder[0].UserID})
        .exec()
        .then( user => {
            if (user.length < 1) {
                username = String(this_bid.Bidder[0].UserID);
                rate = Number(this_bid.Bidder[0].Rating);
                bcrypt.hash(username, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    num = String(Math.floor(Math.random() * 8888888887) + 1111111111);
                    var bidder = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: username,
                        password: hash, 	//add check for confirm pass
                        firstname: username,
                        lastname: username,
                        email: username,
                        phone: num,
                        address: username,
                        city: String(this_bid.Bidder[0].Location),
                        afm: num,
                        rating: rate,
                        role: "user"
                    });
                    console.log(bidder);
                    bidder.save()
                        .then(result => {
                            res.status(201).json({
                                message: 'Bidder Created'
                            });
                            });
                            bidder_id = bidder._id;
                }
                });
            }
            else {
                bidder_id = user[0]._id;
            }
            var bid = new Bid({
                _id: new mongoose.Types.ObjectId(),
                auction: auction_id,
                bidder: bidder_id,
                time: Date(this_bid.Time),
                amount: Number(this_bid.Amount)
            });
            bid.save()
                .then(result => {
                res.status(201).json({
                    message: 'Bid Created'
                });
            });
            addToAuct(auction_id, bid._id, req, res, next);
        })
}

function makeAuct(item, req, res, next) {
    var seller_id;
    var auction_id;
    var i, j;
    var num;
    if (item.Bids[0].Bid)
        bidsLength = item.Bids[0].Bid.length;
    else
        bidsLength = 0;
        //console.log("length: " + bidsLength);
        //console.log(item.Name);
        Auction.find({ name: item.Name})
            .exec()
            .then( auction => {
                if (auction.length >= 1) {
                    return res.status(409).json({
                        message: 'Auction Exists',
                        _id: auction[0]._id
                    });
                }
                else
                {
                    User.find({ username: item.Seller[0].UserID})
                        .exec()
                        .then( user => {
                            if (user.length < 1) {
                                username = String(item.Seller[0].UserID);
                                rate = Number(item.Seller[0].Rating);
                                bcrypt.hash(username, 10, (err, hash) => {
                                    if (err) {
                                        return res.status(500).json({
                                            error: err
                                        });
                                    } else {
                                        num = String(Math.floor(Math.random() * 8888888887) + 1111111111);
                                        const seller = new User({
                                            _id: new mongoose.Types.ObjectId(),
                                            username: username,
                                            password: hash, 	//add check for confirm pass
                                            firstname: username,
                                            lastname: username,
                                            email: username,
                                            phone: num,
                                            address: username,
                                            city: username,
                                            afm: num,
                                            rating: rate,
                                            role: "user"
                                        });
                                        //console.log(seller);
                                        seller.save()
                                        .then(result => {
                                            res.status(201).json({
                                                message: 'User Created'
                                            });
                                        });
                                        seller_id = seller._id;
                                        //console.log("seller id: " + seller_id);

                                    }
                                });
                            }
                            else {
                                seller_id = user[0]._id;
                                //console.log("seller id: " + seller_id);
                            }
                            const auction = new Auction({
                                _id: new mongoose.Types.ObjectId(),
                                name: String(item.Name),
                                category: item.Category,
                                location: String(item.Location),
                                country: String(item.Country),
                                currently: Number(item.Currently),
                                first_bid: Number(item.First_Bid),
                                no_bids: bidsLength,//item.Number_Of_Bids,
                                started: item.Started,
                                ends: item.Ends,
                                description: String(item.Description),
                                latitude: Number(item.Latitude),
                                longitude: Number(item.Longitude),
                                buy_price: item.Buy_Price,
                                seller: seller_id
                    
                            });
                            auction_id = auction._id;
                            auction.save()
                                .then(result => {
                                    //console.log(result);
                                    res.status(201).json({
                                        message: 'Auction Created'
                                    });
                                });
                            //console.log("item: " + item);
                            for (j = 0; j < bidsLength; j++)
                            {
                                var this_bid = item.Bids[0].Bid[j];
                                makeBid(this_bid, auction_id, req, res, next);
                            }
                        })
                }
            });
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

router.post('/', (req, res, next) => {
    var seller_id;
    var auction_id;
    var i, j;
    var item;
    var num;

    /*return res.status(200).json({
        message: req.body.Items.Item[0].Number_of_Bids//req.body.Items.Item[0].Bids[0].Bid[0].Bidder[0].UserID
    });*/
    var arrayLength = req.body.Items.Item.length;
    var bidsLength;

    //console.log(req.body.Items.Item[2].Bids[0].Bid.length);
    //return;
    for (i = 0; i < arrayLength; i++)
    {
        item = req.body.Items.Item[i];
        makeAuct(item, req, res, next);
        sleep(10000);
    }
	
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');
const Bid = require('../models/bid');
const Category = require('../models/category');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

router.post('/', (req, res, next) => {
    console.log(req.body);
     
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
        const auction = new Auction({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.Items.Item[i].Name,
            location: req.body.Items.Item[i].Location,
            country: req.body.Items.Item[i].Country,
            currently: req.body.Items.Item[i].Currently,
            first_bid: req.body.Items.Item[i].First_Bid,
            no_bids: req.body.Items.Item[i].Number_Of_Bids,
            started: req.body.Items.Item[i].Started,
            ends: req.body.Items.Item[i].Ends,
            description: req.body.Items.Item[i].Description,
            latitude: req.body.Items.Item[i].Latitude,
            Longitude: req.body.Items.Item[i].Longitude,
            buy_price: req.body.Items.Item[i].Buy_Price
        });
        return res.status(200).json({
            auction: auction
            /*_id: auction._id,
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
			bids: auction.bids*/
        });
        /*auction.save()
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
            });*/
    }
	
});

module.exports = router;

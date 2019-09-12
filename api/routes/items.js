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
    return res.status(409).json({
        message: req.body.Items.Item.Location
    });
	Auction.find({ name: req.body.Items.Item.Name})
	.exec()
	.then( auction => {
		if (auction.length >= 1) {
			return res.status(409).json({
				message: 'Auction Exists'
			});
		}
		else {
			const auction = new Auction({
				_id: new mongoose.Types.ObjectId(),
                name: req.body.Items.Item.Name,
                location: req.body.Items.Item.Location
			});
			category.save()
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'Category Created'
				});
			}).catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
		}
		});
});

module.exports = router;

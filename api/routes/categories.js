const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Auction = require('../models/auction');
const Product = require('../models/product');
const User = require('../models/user');
const Bid = require('../models/bid');
const Category = require('../models/category');


router.get('/', (req, res, next) => {
	Category.find()
	.select('name')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			categories: docs.map(doc => {
				return {
					name: doc.name
				}
			})
		};
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
});

router.post('/', (req, res, next) => {
	Category.find({ name: req.body.name})
	.exec()
	.then( category => {
		if (category.length >= 1) {
			return res.status(409).json({
				message: 'Category Exists'
			});
		}
		});
			const category = new Category({
			    name: req.body.name
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
});

module.exports = router;

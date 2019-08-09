const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const bodyParser = require('body-parser');

const User = require('../models/user');
/*
_id: mongoose.Schema.Types.ObjectId,
username: { type: String, required: true , unique: true},
password: { type: String, required: true },
firstname: { type: String, required: true },
lastname: { type: String, required: true },
email: { type: String, required: true , unique: true},
phone: { type: String, required: true , unique: true},
address: { type: String, required: true },
city: { type: String, required: true },
afm:{ type: String, required: true , unique: true}
*/

router.get('/', (req, res, next) => {
	User.find()
	.select('_id username firstname lastname email phone address city afm')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			users: docs.map(doc => {
				return {
					_id: doc._id,
					username: doc.username,
					firstname: doc.firstname,
					lastname: doc.lastname,
					email: doc.email,
					phone: doc.phone,
					address: doc.address,
					city: doc.city,
					afm: doc.afm
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

router.post('/signup', (req, res, next) => {
	User.find({ username: req.body.username}) //add more checks
	.exec()
	.then( user => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'Username Exists'
			});
		}
		});
	User.find({ email: req.body.email}) //add more checks
	.exec()
	.then( user => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'Email Exists'
			});
		}
		});
	User.find({ phone: req.body.phone}) //add more checks
	.exec()
	.then( user => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'Phone Exists'
			});
		}
		});
	User.find({ afm: req.body.afm}) //add more checks
	.exec()
	.then( user => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'Afm Exists'
				});
			}
			});
	bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
				return res.status(500).json({
					error: err
				});
			} else {
				const user = new User({
				_id: new mongoose.Types.ObjectId(),
				username: req.body.username,
				password: hash, 	//add check for confirm pass
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				phone: req.body.phone,
				address: req.body.address,
				city: req.body.city,
				afm: req.body.afm
				});
				user.save()
				.then(result => {
					console.log(result);
					res.status(201).json({
						message: 'User Created'
					});
					return res.redirect('/pages/thanks_signup.html');
				}).catch(err => {
					console.log(err);
					res.status(500).json({
						error: err
					});
				});
			}
		});
	});

router.post('/login', (req, res, next) => {
	User.find({ email: req.body.email})
	.exec()
	.then(user => {
		if (user.length < 1) {
			return res.status(401).json({
				message: 'Auth Failed'
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if (err) {
				return res.status(401).json({
					message: 'Auth Failed'
				});
			}
				if (result) {
					const token = jwt.sign(
					{
						email: user[0].email,
						userId: user[0]._id
					},
					process.env.JWT_KEY,
					{
						expiresIn: "1h"
					});
					return res.status(200).json({
						message: 'Auth Successful',
						token: token
					});
				}
				res.status(401).json({
					message: 'Auth Failed'
				});
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.delete('/:userId', (req, res, next) => {
	User.remove({ _id: req.params.userId})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'User Deleted'
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
})
module.exports = router;

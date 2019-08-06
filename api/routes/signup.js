const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var crypto = require('crypto');

//const bodyParser = require('body-parser');

const User = require('../models/user');

router.post('/', (req, res, next) => {
	const user = new User({

		_id: new mongoose.Types.ObjectId(),
		username: req.body.username,
		//password_confirm: req.body.password_confirm,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		city: req.body.city,
		afm: req.body.afm
	});
	user.setPassword(req.body.password)
	user.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'User Created',
			createdUser: {
				_id: result._id,
				username: result.username,
				password: result.password,
				firstname: result.firstname,
				lastname: result.lastname,
				email: result.email,
				phone: result.phone,
				address: result.address,
				city: result.city,
				afm: result.afm
			}
		});
		return res.redirect('/pages/thanks_signup.html');
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});
module.exports = router;

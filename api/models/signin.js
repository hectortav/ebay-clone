const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var crypto = require('crypto');

//const bodyParser = require('body-parser');

const User = require('../models/user');


router.post('/', (req, res, next) => {
	const username = req.body.username;
  User.findBy
		username: req.body.username,
		password: req.body.password,
	});

		return res.redirect('/pages/thanks_signup.html');
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});

module.exports = router;

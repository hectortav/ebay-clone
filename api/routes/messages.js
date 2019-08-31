const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Message = require('../models/message');

router.get('/:userId/sent', (req, res, next) => {
	User.find({ sender: userId})
	.select('_id sender receiver text')
	.exec()
	.then(docs => {
		return res.status(200).json({
            _id: doc._id,
            sender: doc.sender,
            receiver: doc.receiver,
            subject: doc.subject,
            time: doc.time,
            text: doc.text
        });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
});

router.post('/', (req, res, next) => {
	
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
						userId: user[0]._id,
						role: user[0].role
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

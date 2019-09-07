const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Message = require('../models/message');

router.get('/:userId/sent', (req, res, next) => {
	Message.find({ sender: req.params.userId })
		.select('_id sender receiver time subject text read')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				messages: docs.map(doc => {
					return {
						_id: doc._id,
						sender: doc.sender,
						receiver: doc.receiver,
						subject: doc.subject,
						time: doc.time,
						text: doc.text,
						read: doc.read
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

router.get('/:userId/received', (req, res, next) => {
	Message.find({ receiver: req.params.userId })
		.select('_id sender receiver time subject text read')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				messages: docs.map(doc => {
					return {
						_id: doc._id,
						sender: doc.sender,
						receiver: doc.receiver,
						subject: doc.subject,
						time: doc.time,
						text: doc.text,
						read: doc.read
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

router.get('/:userId/received/unread', (req, res, next) => {
	Message.find({ receiver: req.params.userId })
		.select('_id sender receiver time subject text read')
		.exec()
		.then(docs => {
			let i = 0;
			for (var index = 0; index < docs.length; index++) {
				if (docs[index].read == false) {
					i++;
				}
			}
			const response = {
				unread: i
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
	const message = new Message({
		_id: new mongoose.Types.ObjectId(),
		sender: req.body.sender,
		receiver: req.body.receiver,
		subject: req.body.subject,
		time: req.body.time,
		text: req.body.text,
		read: req.body.read
	});
	message.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Message Created'
			});
		}).catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.put('/:messageId', (req, res, next) => {
	const id = req.params.messageId;

	Message.findById(req.params.messageId)
		.exec()
		.then(message => {
			if (!message) {
				return res.status(404).json({
					message: 'Message Not Found'
				});
			}
			const temp_message = new Message({
				_id: message._id,
				sender: message.sender,
				receiver: message.receiver,
				subject: message.subject,
				time: message.time,
				text: message.text,
				read: message.read
			});

			if (req.body.read)
				temp_message.read = req.body.read;

			Message.update({ _id: id }, {
				$set: {
					sender: temp_message.sender,
					receiver: temp_message.receiver,
					subject: temp_message.subject,
					time: temp_message.time,
					text: temp_message.text,
					read: temp_message.read
				}
			})
				.exec()
				.then(result => {
					res.status(200).json({
						message: 'Message updated'
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						error: err
					});
				});
		});
});

router.delete('/:messageId', (req, res, next) => {
	Message.remove({ _id: req.params.messageId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Message Deleted'
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

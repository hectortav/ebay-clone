const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'GET requests under /products'
	});
});

router.post('/', (req, res, next) => {
	res.status(200).json({
		message: 'POST requests under /products'
	});
});

module.exports = router;
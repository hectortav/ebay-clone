const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'GET requests under /products'
	});
});

router.post('/', (req, res, next) => {
	const product = {
		name: req.body.name,
		price: req.body.price
	};
	res.status(201).json({
		message: 'POST requests under /products',
		createdProduct: product
	});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	if (id === 'test') {
		res.status(200).json({
			message: 'This is a test case'
		})
	}
	else {
		res.status(200).json({
			message: 'You passed an ID',
			id: id
		});
	}
});

router.patch('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated product'
	});
});

router.delete('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted product'
	});
});

module.exports = router;
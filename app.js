// const express = require('express');
// const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
app.options('*', cors())

const userRoutes = require('./api/routes/users');
const productRoutes = require('./api/routes/products');
const auctionRoutes = require('./api/routes/auctions');
const bidRoutes = require('./api/routes/bids');
const categoryRoutes = require('./api/routes/categories');


mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0-9xgg4.mongodb.net/test?retryWrites=true&w=majority',
{
	useNewUrlParser: true,
	useCreateIndex: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Controll-Allow-Headers",
		"Origin, X-Requested-Woth, Content-Type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS')
	{
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/products', productRoutes);
app.use('/auctions', auctionRoutes);
app.use('/users', userRoutes);
app.use('/bids', bidRoutes);
app.use('/categories', categoryRoutes);


app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;

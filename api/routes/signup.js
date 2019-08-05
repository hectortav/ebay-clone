const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');

router.post('/', (req, res, next) => {
	var signup_username = req.body.signup_username;
	var signup_password =req.body.signup_password;
	var signup_password_confirm = req.body.signup_password_confirm;
	var signup_firstname =req.body.signup_firstname;
	var signup_lastname = req.body.signup_lastname;
	var signup_email =req.body.signup_email;
	var signup_phone = req.body.signup_phone;
	var signup_address =req.body.signup_address;
	var signup_city = req.body.signup_city;
	var signup_afm =req.body.signup_afm;

	var data = {
		"signup_username": signup_username,
		"signup_password":signup_password,
		"signup_password_confirm":signup_password_confirm,
		"signup_firstname":signup_firstname,
		"signup_lastname": signup_lastname,
		"signup_email":signup_email,
		"signup_phone":signup_phone,
		"signup_address":signup_address,
		"signup_city":signup_city,
		"signup_afm":signup_afm
	}
});
/*
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/signup', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");

	});

	return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");*/
module.exports = router;

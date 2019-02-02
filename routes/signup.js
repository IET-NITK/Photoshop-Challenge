var express = require('express');
var router = express.Router()
var user = require('../models/allschema').users
var mailer = require('../components/mailer')

router.get('/', function (req, res, next) {
	res.render('signup');
});

router.post('/', async function (req, res, next) {
	try {
		let pw = Math.random().toString(36).substring(7);
		await Promise.all([mailer.service.sendMail(mailer.opts(req.body.email, pw)), user.create({
			email : req.body.email, 
			password : pw
		})]);
		
		res.render('index', { message : `${req.body.email} is successfully registered`})
	}
	catch(e){
		res.render('error');
	}
	
});

module.exports = router;

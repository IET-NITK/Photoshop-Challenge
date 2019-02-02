var express = require('express');
var router = express.Router()
var User = require('../models/allschema').users
var mailer = require('../components/mailer')

router.get('/', function (req, res, next) {
	res.render('signup');
});

router.post('/', async function (req, res, next) {
	try {
		var user = await User.findOne({email : req.body.email})
		console.log(user)
		if(!user){
			let pw = Math.random().toString(36).substring(7);
			await Promise.all([mailer.service.sendMail(mailer.opts(req.body.email, pw)), User.create({
				email : req.body.email, 
				password : pw
			})]);
		}
		else{
			await mailer.service.sendMail(mailer.opts(req.body.email, user.password))
		}
		res.render('index', { massage : `${req.body.email} is successfully registered`})
	}
	catch(e){
		console.log(e)
		res.render('error');
	}
	
});

module.exports = router;

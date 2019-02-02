var express = require('express');
var router = express.Router();
var User = require('../models/allschema').users

router.post('/', async function (req, res, next) {
	try {
		var email = req.body.email
		var password = req.body.password
		let user = await User.findOne({ email, password })
		if (!user) {
			res.render('signup', "You need to register");
		}
		res.render('user', {id : user._id})
	}
	catch(e){
		res.render('error')
	}

});

module.exports = router;

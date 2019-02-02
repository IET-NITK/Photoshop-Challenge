var express = require('express');
var router = express.Router();
var User = require('../models/allschema').users

/* GET users listing. */
router.post('/', async function (req, res, next) {
	var email = req.body.email
	var password = req.body.password
	let user = await User.findOne({ email, password })
	console.log(user);
});

module.exports = router;

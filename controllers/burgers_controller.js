/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/

// setting up npm
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var burger = require('../models/burger.js');


// Telling the routing program how to handle various requests

//redirect to send people from / to /burgers
router.get('/', function(req,res) {
	res.redirect('/burgers')
});

//uses the selectAll function from burger.js to create hbsObject to send to our handlebars and create a page to be viewed.
router.get('/burgers', function(req,res) {
	burger.selectAll(function(data){
		var hbsObject = {burgers : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

// uses the post command to post data from the webpage to the back end through the insertOne function found in burger.js
// redirects back to /burgers to make it re-display the page
router.post('/burgers/create', function(req,res) {
	burger.insertOne(['burger_name'], [req.body.burger_name], function(data){
		res.redirect('/burgers')
	});
});

//using the put command to change the statues of devoured
router.put('/burgers/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.updateOne({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/burgers');
	});
});

module.exports = router;
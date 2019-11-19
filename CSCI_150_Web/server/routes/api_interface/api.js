const express = require('express');
const router = express.Router();
const database_data = require('../../models/data.models.js');
const authCheck = require('./../../auth_verify.js');


//This represents the xyz/api url path
//Put description on how to use the API or just send a 404/500 response?
router.get('/', (req,res) => {
	res.sendStatus(404);
	return;
});



// path to retrieve data from MongoDB
router.get('/find', authCheck, (req, res) => {

	// Acess the req.query object to see if the parameters were supplied
	if(!req.query.deviceID || !req.query.sensor){
		res.sendStatus(400);  //Send bad request if one parameter missing
		return;
	}

	var query = {
		deviceID: req.query.deviceID,
		name: req.query.sensor
	}
	//Query database to find doc matching parameters
	database_data.find(query, (err, docs) => {
		if(err){
			res.sendStatus(500);
			return;
		}
			res.json(docs);
	});

});


// path to retrieve specific year data
router.get('/find/:year', authCheck, (req, res) => {

	if(!req.query.deviceID || !req.query.sensor || !req.params.year){
		res.send(400);
		return;
	}

	var query = {
		year_timestamp: req.params.year,
		deviceID: req.query.deviceID,
		name: req.query.sensor
	}


	database_data.findOne(query, (err, docs) => {
		if(err){
			res.sendStatus(500);
			return;
		}
		res.json(docs);	
	});
});




router.get('/find/:year/:month', authCheck, (req, res) => {

	if(!req.query.deviceID || !req.query.sensor || !req.params.year || !req.params.month){
		res.send(400);
		return;
	}

	var query = {
		year_timestamp: req.params.year,
		deviceID: req.query.deviceID,
		name: req.query.sensor
	}
	
	var month_number = req.params.month
	database_data.findOne(query, (err, docs) => {
		if(err){
			res.sendStatus(500);
			return;
		}
	res.json(docs.results.month[month_number].day);	
	});
});


router.get('/find/:year/:month/:day', authCheck, (req, res) => {

	if(!req.query.deviceID || !req.query.sensor || !req.params.year || !req.params.month 
		|| !req.params.day){
		res.send(400);
		return;
	}

	var query = {
		year_timestamp: req.params.year,
		deviceID: req.query.deviceID,
		name: req.query.sensor
	}
	
	var month_number = req.params.month
	var day_number = req.params.day
	database_data.findOne(query, (err, docs) => {
		if(err){
			res.sendStatus(500);
			return;
		}

	res.json(docs.results.month[month_number].day[day_number]);	

	});

});



module.exports = router;


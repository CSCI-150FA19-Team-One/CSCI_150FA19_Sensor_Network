const express = require('express');
const router = express.Router();
const database_data = require('../../models/data.models.js');


//This represents the xyz/api url path
//Put description on how to use the API or just send a 404/500 response?
router.get('/', (req,res) => {
	res.sendStatus(404);
	return;
});



// path to retrieve data from MongoDB
router.get('/find', (req, res) => {

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
	database_data.findOne(query, (err, docs) => {
		if(err){
			res.sendStatus(500);
			return;
		}
			res.json(docs);
	});

});

module.exports = router;


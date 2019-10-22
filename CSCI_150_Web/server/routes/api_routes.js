const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const temperature = require('../models/sensor_data.js');





//This represents the xyz/api url path
//Put description on how to use the API or just send a 404/500 response?
router.get('/', (req,res) => {
	res.send(404);
})



//Query to find all documents under a table
// :sensor param value are tempF or tempC
router.get('/find_all/:deviceID.:sensor', (req,res) => {
	input_deviceID = req.params[0];
	input_sensor = req.params[1]; 

	if(input_sensor === 'tempF'){
		//Connecting to MongoDB
		mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: false,useUnifiedTopology: true});

		//Getting the DB object
		const db = mongoose.connection;

		//If couldn't connect to database, output error
		db.on('error', console.error.bind(console, "MongoDB error"));

		db.on('open', () => {
			console.log("Connected to mongodb as a response from API request");
		});

		//Output all documents under that
		temperature.find({device: :deviceID, name: })





	}
	else if (input_sensor === 'tempC'){

	}
	//Bad sensor param value
	else{
		res.send(404);
	}

});


//Query to specific documents under a certain table
//possible tables are: Temperatures, Humiditys, ?
router.get('/find_all_<tableName:params', (req,res) => {



});





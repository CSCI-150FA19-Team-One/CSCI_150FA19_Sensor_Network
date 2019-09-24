const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const uploads = require('express-fileupload'); // Not in use
const mongoose = require('mongoose'); // Not in use right now
const assert = require('assert'); // ?


const routes = require('./routes');




// The port which the web server will start on
const port = 3000;

//The mongoDB connection - LOCAL, and DB name
const local_url = 'mongodb://127.0.0.1:27017';
const database = 'sensor_data';

//test file location - DEVELOPMENT PURPOSES ONLY
const test_file_dir = require('/home/richard/Documents/sensorApp/CSCI_150FA19_Sensor_Network/CSCI_150_Web/server/test_files/testdatatemps.json');

//Creating the database instance
const client = new MongoClient(local_url, {useNewUrlParser: true, useUnifiedTopology: true});



app.use(routes);



/* Disabling the MongoDB section for now.

//Connecting to MongoDB
client.connect( (err) => {
	assert.equal(null, err);
	console.log('Established connection to MongoDB server');
	const db = client.db(database);

	//Drop any collection in data before creating a new one
	//Should make it not rely on having to need a fixed data name
	db.collection("data").drop({}, () => {
		console.log("Dropped all collections");
	});

	//Creating the collection group
	db.createCollection("data", () => {
		console.log("data collection created!");
	});

	const collection = db.collection("data");

	//Everytime the server.js is run, it adds this file into
	//the DB
	collection.insertOne(test_file_dir, (err, result) => {
		if(err){
			console.log("Oops! Something went wrong");
		}
		else{
			console.log("json file added into collection");
		}
	});

	//Finds all documents and output to console
	collection.find({}).toArray( (err, temp) => {
		console.log(JSON.stringify(temp,null, 2));
	});


	client.close( () => {
		console.log("Session ended!");
	});
});
*/




//Starts the server on specified port, callback function
//That outputs to console.log the message
app.listen(port, () => {
	console.log(`Express server started on port: ${port}` );
});








const mongoose = require('mongoose');

//Config settings
const settings = require('./config.json');
const temperature = require('./models/sensor_data.js');


//Connecting to MongoDB
mongoose.connect(settings.mongoDB_path, {useNewUrlParser: false,useUnifiedTopology: true});

//Getting the DB object
const db = mongoose.connection;

//If couldn't connect to database, output error
db.on('error', console.error.bind(console, "MongoDB error"));

db.on('open', () => {
	console.log("Connected to mongodb!");
});


temperature_Array = []

//Will find all documents with the specific coreInfo property
//Returns an array of objects
//Use that in the callback to grab the data out.
temperature.find({'coreInfo.deviceID': '50ff6f065067545626430587'} , (err, docs) => {
		if (err)
		{
			console.log(err);
		}
		else {
			for(var i = 0; i < docs.length; i++){
				//only get 2 decimal places
				var value = docs[i].result.toFixed(2);
				temperature_Array.push(value);
			}

			console.log(`${temperature_Array}`);
		}	
		console.log("Finished!")
});






/*



const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const mongoose = require('mongoose');

//local modules
const settings = require('./config.json');
const temperature = require('./models/sensor_data.js');


/********************************************************
const liveAgent = new https.Agent({keepAlive: true});


//Connecting to MongoDB
mongoose.connect(settings.mongoDB_path, {useNewUrlParser: false,useUnifiedTopology: true});

//Getting the DB object
const db = mongoose.connection;

//If couldn't connect to database, output error
db.on('error', console.error.bind(console, "MongoDB error"));

db.on('open', () => {
	console.log("Connected to mongodb!");
});
/*********************************************************/


/*

//Function that will make GET requests to grab data
//Needs the authenticatoin token, device id, and the host
function get_requests(token, deviceID, host){
	var path_dir = "/v1/devices/" + deviceID + "/temp?access_token=" + token

	var options = {
	host: `${host}`,
	path: `${path_dir}`,
	method: "GET",
	agent:liveAgent,
	headers: {Connection: 'keep-alive'}
	};


	var req = https.request(options, (res) => {
		console.log(`connection status: ${res.statusCode}`);
		var response_data = ""

		//Getting the data from the get request
		res.on('data', (data) => {
			console.log("Grabbing data!");
			response_data += data;	//response_data is a string

		});//End of res.on('data')

		//All data has been grabbed from the response, store in DB
		res.on('end', () =>{
			var data = JSON.parse(response_data);	//turn data in JSON

			/*
			//Save data as a new record
			var current_temperature = new temperature(data);
			current_temperature.save((err) => {
				if (err){
					console.log(err);
				}
				else{
					console.log("Data has been saved into DB!")
				}
			});
			*/
			/*
			//output all documents under the model temperature
			temperature.find((err, docs) => {
				if (err)
				{
					console.log(err);
				}
				else {
					console.log(docs);
				}
			});

			temperature.find({name: 'temp'}, (err, docs) => {
					if (err)
					{
						console.log(err);
					}
					else {
						console.log(docs);
					}	
			});
			

			//Output all documents with with a specific ID
			temperature.find({'coreInfo.deviceID': '50ff6f065067545626430587'} , (err, docs) => {
					if (err)
					{
						console.log(err);
					}
					else {
						console.log(docs);
					}	
			});


			console.log('Ended Session!');
		});//End of res.on('end')


	});//End of https.request

	req.end();
}//End of function get_requests


//Needs to be aware of the config.json file AND of the function get_requests
function loop_through_data()  {
	//For loop to make get requests to gather data from the sensor devices
	for (var i = 0; i < settings.device_ID.length; i++){
		get_requests(settings.token, settings.device_ID[i], settings.host)
	}


}


//Event loop, every 10 seconds will call loop_through_data()
setInterval(loop_through_data, 3000);




exports.loop_through_data = function() {
	for (var i = 0; i < settings.device_ID.length; i++){
		get_requests(settings.token, settings.device_ID[i], settings.host)
	}
	return console.log("Finished making all requests");
}



*/
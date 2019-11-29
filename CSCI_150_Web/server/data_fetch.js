// 3rd Party modules
const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const database_data = require('./models/data.models.js');

//const requestPromise = require('request-promise');


//local modules
const settings = require('./config.json');

/*
var urls[
	"https://api.particle.io/v1/devices/e00fce681c2671fc7b1680eb/tempC?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",

	"https://api.particle.io/v1/devices/e00fce681c2671fc7b1680eb/tempF?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",

	"https://api.particle.io/v1/devices/e00fce681c2671fc7b1680eb/HumidityL?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",

	"https://api.particle.io/v1/devices/e00fce681c2671fc7b1680eb/HumidityT?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",



	"https://api.particle.io/v1/devices/e00fce686522d2441e1f693f/tempC?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",

	"https://api.particle.io/v1/devices/e00fce686522d2441e1f693f/tempF?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",
	
	"https://api.particle.io/v1/devices/e00fce686522d2441e1f693f/HumidityL?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",
	
	"https://api.particle.io/v1/devices/e00fce686522d2441e1f693f/HumidityT?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",



	"https://api.particle.io/v1/devices/e00fce68b1b49ccf2e314c17/tempC?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",
	
	"https://api.particle.io/v1/devices/e00fce68b1b49ccf2e314c17/tempF?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",
	
	"https://api.particle.io/v1/devices/e00fce68b1b49ccf2e314c17/HumidityL?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3",
	
	"https://api.particle.io/v1/devices/e00fce68b1b49ccf2e314c17/HumidityT?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3"
]
*/



//Function that will make GET requests to grab data
//Needs the authenticatoin token, device id, host, and what temp unit
//Farenheight tempF or celsuis tempC
function get_requests(token, deviceID, host, temp){
	var path_dir = "/v1/devices/" + deviceID + `/${temp}?access_token=` + token

	var options = {
	host: `${host}`,
	path: `${path_dir}`,
	method: "GET"
	};


	var request = https.request(options, (res) => {
		console.log(`connection status: ${res.statusCode}`);
		console.log('Request made at: ' + Date());
		var response_data = "";

		if(res.statusCode === 200){
			//Getting the data from the get request
			res.on('data', (data) => {
				console.log("Grabbing data!");
				response_data += data;	//response_data is a string

			});//End of res.on('data')

			res.on('error', (err) => {
				console.log("error: " + err);
			});


			//All data has been grabbed from the response, store in DB
			res.on('end', () =>{
				var data = JSON.parse(response_data);	//turn data in JSON
				
				//Creating date object to find out current date information
				var current_date = new Date();


				var current_year = current_date.getFullYear(); //Gets current year i.e 2019
				var current_month = current_date.getMonth() + 1; //1-12
				var current_day = current_date.getDate(); //1-31
				var current_hour = current_date.getHours();  //gets the current hour 
				var current_minute = current_date.getMinutes() //gets the current minutes

				//Convert month and day to strings to use in gatheredAt field
				var timestamp = current_hour.toString() +":"+ current_minute.toString();



				//Primary keys used to find the document to update
				var filter = {
					year_timestamp: current_year,
					deviceID: data.coreInfo.deviceID,
					name: data.name
				}

				//options for the update - Upsert creates a document if none found
				//New returns the updated document
				var options = {upsert: true, new: true};


				//The path to update can not contain variables or string concats
				//must use object literal? to get around this issue
				var updateKey = "results.month."+current_month+".day."+current_day;
				var temp = {};
				temp[updateKey] = {gatheredAt: timestamp, value: data.result};


				//Will look for a document matching the filter. If none found, will insert
				//a new document with filter and update properties. Otherwise, update
				//the given property only	
				database_data.findOneAndUpdate(filter, {$push: temp}, options, (err, docs) => {
						if(err){
							console.log("Could not find or update the document");
						}
					});

				console.log('End of get Request!');
			});//End of res.on('end')
		}// if statement
	});//End of https.request


	request.on('error', (err) => {
		console.log("request.on('error) called");
		console.log(err);
	});

	request.end();
}//End of function get_requests




//Double for loop. For loop 1 goes through all the devices in the config
//For loop 2 goes through all the sensors on those devices
exports.loop_through_devices = function() {
	for (var i = 0; i < settings.device_ID.length; i++){
		for(var k = 0; k < settings.sensor.length; k++ ){
			get_requests(settings.token, settings.device_ID[i], settings.host, settings.sensor[k]);
		}
	}
	return console.log("Finished making all requests");
}

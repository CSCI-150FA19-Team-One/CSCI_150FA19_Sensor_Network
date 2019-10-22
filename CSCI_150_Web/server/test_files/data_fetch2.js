const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const mongoose = require('mongoose'); //For connecting to the DB

//local modules
const settings = require('../config.json');
const Data = require('../models/data_model.js');


	//Connecting to MongoDB
	mongoose.connect(settings.mongoDB_path, {useNewUrlParser: false,useUnifiedTopology: true});

	//Getting the DB object
	const db = mongoose.connection;

	//If couldn't connect to database, output error
	db.on('error', console.error.bind(console, "MongoDB error"));

	db.on('open', () => {
		console.log("Connected to mongodb!");
	});

//Function that will make GET requests to grab data
//Needs the authenticatoin token, device id, and the host
function get_requests(token, deviceID, host){



	
	var path_dir = "/v1/devices/" + deviceID + "/temp?access_token=" + token

	var options = {
	host: `${host}`,
	path: `${path_dir}`,
	method: "GET"
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
			var odata = JSON.parse(response_data);	//turn data in JSON
			
			//Query to see if any records already exist of the
			//deviceID that data was gathered from
			Data.find({"deviceID": odata.coreInfo.deviceID}, (err, docs) => {
				if(err){console.log(err);}
				else if (docs.length > 0){
					console.log("docs found!")
					//if there is a document already, update that doc instead
					Data.update(
						{"deviceID": odata.coreInfo.deviceID, 
						 "sensor_data.name": odata.name},
						{"$push": {"sensor_data.data_points": odata.result}}
						);
				}
				else {
					//Save data as a new record
					console.log("No Doc found!");
					var current_data = new Data({
						deviceID : odata.coreInfo.deviceID,
						sensor_data: [{
							name: odata.name,
							values: [odata.result]
						}]
					});
					current_data.save( (err) => {
						if (err){
							console.log(err);
						}
						else{
							console.log("Data has been saved into the DB");
						}
					});

				}
				//Output all documents with with a specific ID
				Data.find({}, (err, docs) => {
						if (err)
						{
							console.log(err);
						}
						else {
							console.log(docs);
						}	
				});
			});
			



			console.log('Ended Session!');
		});//End of res.on('end')


	});//End of https.request

	req.end();
	//mongoose.disconnect();
}//End of function get_requests




function loop_through_devices() {
	for (var i = 0; i < settings.device_ID.length; i++){
		get_requests(settings.token, settings.device_ID[i], settings.host)
	}
	return console.log("Finished making all requests");
}


setInterval(loop_through_devices, 3000);


/*
exports.loop_through_devices = function() {
	for (var i = 0; i < settings.device_ID.length; i++){
		get_requests(settings.token, settings.device_ID[i], settings.host)
	}
	return console.log("Finished making all requests");
}
*/



















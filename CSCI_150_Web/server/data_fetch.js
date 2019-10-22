// 3rd Party modules
const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const database_data = require('./models/data.models.js');

//local modules
const settings = require('./config.json');


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
			
			filter = {
				deviceID: data.coreInfo.deviceID,
				name: data.name
			}


			// Looks for a doc matching filter properties. If none found,
			// Inserts a doc with filter and push properties.
			// Otherwise just updates the results array of the doc, adding 
			// Another element to it.
			database_data.findOneAndUpdate(filter, {"$push": { "results": data.result}} 
				, {upsert: true, new: true},(err, docs) => {
				if(err){
					console.log("Could not find or update the document");
				}
				/*
				else{
					console.log(docs)
				}
				*/
			});

			console.log('End of get Request!');
		});//End of res.on('end')


	});//End of https.request

	req.end();
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


const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const mongoose = require('mongoose');

//local modules
const settings = require('./config.json');
const temperature = require('./models/sensor_data.js');


/*********************************************************/
const liveAgent = new https.Agent({keepAlive: true});
/*********************************************************/




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
			

			//Connecting to MongoDB
			mongoose.connect(settings.mongoDB_path, {useNewUrlParser: false,useUnifiedTopology: true});

			//Getting the DB object
			const db = mongoose.connection;

			//If couldn't connect to database, output error
			db.on('error', console.error.bind(console, "MongoDB error"));

			db.on('open', () => {
				console.log("Connected to mongodb!");
			});



			//Disabling for now, too much output
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
			*/

			//Output all documents with with a specific ID
			temperature.find({'coreInfo.deviceID': '50ff6f065067545626430587'} , (err, docs) => {
					if (err)
					{
						console.log(err);
					}
					else {
						console.log(docs);
						mongoose.disconnect();
					}	
			});


			console.log('Ended Session!');
		});//End of res.on('end')


	});//End of https.request

	req.end();
}//End of function get_requests


exports.loop_through_devices = function() {
	for (var i = 0; i < settings.device_ID.length; i++){
		get_requests(settings.token, settings.device_ID[i], settings.host)
	}
	return console.log("Finished making all requests");
}



































/*
			var parsed_data = JSON.parse(response_data);

			//Connecting to MongoDB
			mongoose.connect(settings.mongoDB_path, {useNewUrlParser: false,useUnifiedTopology: true});

			//Getting the DB object
			const db = mongoose.connection;

			//If couldn't connect to database, output error
			db.on('error', console.error.bind(console, "MongoDB error"));

			db.once('open', () => {
				//Save data into MongoDB
				data.save( (err, data) => {
						if (error){ 
							return console.log(err);
						}
						else {
							console.log("Temp value saved: " + data.result);
						}
					});
				});








			/*
		*/


























			/* Possibly not needed anymore
			//Move the newly created json file to the destination dir. No dupes
			mv(`data_${deviceID}.json`, __dirname + `/temp_files/data_${deviceID}`, {clobber: false}, (err) => {
				//If file already exists in dest location, delete the file new file
				if(err){ 
					console.log("File already exists! Not moving. Deleting now");
					var delete_file_path = `data_${deviceID}.json`;

					//async method
					fs.unlink(delete_file_path, (err) => {
						if(err){ 
							console.log(err);
							return
						}
					});
				}
				else console.log("It works?");
			});

		*/












/*








//Creating the schema for the acceptable data from the devices
const Schema = mongoose.Schema




//Mongoose will create model for SensorDatas collection
const data_model = mongoose.model('dataModel', data_schema);
const model_instance = new data_model({name: 'Data'});
model_instance.save( () => {


});



















//The allowed data must contain a deviceID string found
//In config.js
const data_schema = new Schema({
	uniqueID: Schema.ObjectId;
	cmd: String,
	name: {type: String, required: true}
	result: {type: Number, min: -10, max: 130, required: true},
	coreInfo: 
			{
				last_app: String,
				last_heard: Date,
				connected: Boolean,
				last_handshake_at: Date,
				deviceID: 
					{
						type: String, 
						required: true,
						enum: [settings.deviceID[0]]
					},
				product_id: Number
			}
});





*/
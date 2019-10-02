const MongoClient = require('mongodb').MongoClient;
const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const fs = require('fs'); //For writing the obtained string from the get req
						 // To a file
const mv = require('mv') //For moving the files

//Config settings
const settings = require('./config.json');

//Function that will make GET requests to grab data
//Needs the authenticatoin token, device id, and the host
function grab_data(token, deviceID, host) {
	//var host_name = host
	//var device_id = deviceID
	//var auth_token = token //never expires
	var path_dir = "/v1/devices/" + deviceID + "/temp?access_token=" + token

	var options = {
	host: `${host}`,
	path: `${path_dir}`,
	method: "GET"
	};


	var req = https.request(options, (res) => {
		//reponse_data is used to hold the retrieved object
		var response_data;

		//Status Code 200 = OK
		console.log(`status code: ${res.statusCode}`);
		
		res.on('data', (data) => {
			response_data = data;
			console.log(`${response_data}`;
			
			//Write the string to a file and save it - async method
			fs.writeFile(`data_${deviceID}.json`, response_data, (err) => {
				if (err) console.log("Not working!", err);
				console.log("Saved data to a file!");
			});

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


		});


		res.on('end', () => {
			console.log("Ended Session!");
		});

});

req.end();

}


//For loop to make get requests to gather data from the sensor devices
for (var i = 0; i < settings.device_ID.length; i++){
	grab_data(settings.token, settings.device_ID[i], settings.host)


}//End of for loop

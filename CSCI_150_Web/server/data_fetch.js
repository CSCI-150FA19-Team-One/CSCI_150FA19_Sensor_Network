const MongoClient = require('mongodb').MongoClient;
const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const fs = require('fs'); //For writing the obtained string from the get req
						 // To a file

const mv = require('mv') //For moving the files


//Save the objects into an array, with each object
//Containing the device_ID and auth_token pair
var device_ID_Array_Objects = []


//Instead of getting this, will get a document from MongoDB
var example = {
	host: "api.particle.io",
	deviceID:"50ff6f065067545626430587",
	token: "895043e69c01b80b464cdd995e913efa4b25c3a3"
	 }

//device_ID_Array.push(deviceID);
device_ID_Array_Objects.push(example);


//Function that will make GET requests to grab data
//Needs the authenticatoin token, device id, and the host
function grab_data(token, deviceID, host) {
	var host_name = host
	var device_id = deviceID
	var auth_token = token //never expires
	var path_dir = "/v1/devices/" + device_id + "/temp?access_token=" + auth_token

	var options = {
	host: `${host_name}`,
	path: `${path_dir}`,
	method: "GET"
	};


	var req = https.request(options, (res) => {
		//The string that will contain the data from the get request
		var response_data;

		//Status Code 200 = OK
		console.log(`status code: ${res.statusCode}`);
		
		res.on('data', (data) => {
			response_data = data;
			console.log(`${response_data}`)
			
			//Write the string to a file and save it - async method
			fs.writeFile(`data_${device_id}.json`, response_data, (err) => {
				if (err) console.log("Not working!", err);
				console.log("Saved data to a file!");
			});

			//Move the newly created json file to the destination dir. No dupes
			mv(`data_${device_id}.json`, __dirname + `/temp_files/data_${device_id}`, {clobber: false}, (err) => {
				//If file already exists in dest location, delete the file new file
				if(err){ 
					console.log("File already exists! Not moving. Deleting now");
					var delete_file_path = `data_${device_id}.json`;

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


//Will loop through the device_ID_Array grabbing every device_ID
//And making a request for that devices temp data
for (var i = 0; i < device_ID_Array_Objects.length; i++){
	grab_data(device_ID_Array_Objects[i].token, device_ID_Array_Objects[i].deviceID, device_ID_Array_Objects[i].host);
}



//User will visit some url on the front-end
//In a textbox 


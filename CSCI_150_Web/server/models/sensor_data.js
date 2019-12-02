/**** Temperature Model Schema *************/


const mongoose = require('mongoose');
const Schema = mongoose.Schema
const settings = require('./../config.json')

//Creating the schema
const data_schema = new Schema({
	uniqueID: Schema.ObjectId,
	cmd: String,
	name: {type: String, required: true},
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
						required: true
						//enum: [settings.device_ID[0]]
					},
				product_id: Number
			}
});

//Creating the model
const temperature = mongoose.model('Temperature', data_schema);

module.exports = temperature;
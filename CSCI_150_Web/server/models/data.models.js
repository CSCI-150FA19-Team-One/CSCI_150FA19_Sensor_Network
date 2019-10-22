/**** Data Model Schema *************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Creating the schema
const data_model_schema = new Schema({
	deviceID: {type: String, required: true},
	name: {type: String, required: true},
	results: [{type: Number}]
});



//Creating the model
const database_data = mongoose.model('DevicesData', data_model_schema);

module.exports = database_data;
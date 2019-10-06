/******** Config Settings Schema **************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema


const config_schema = new Schema({
	host: {type: String, default: 'api.particle.io'}
	device_ID: {type: Array, required: true}
	token: {type: String, required: true}
	mongoDB_path: {type: String, default: 'mongodb://127.0.0.1:27017'}
});

const config_settings = mongoose.model('Setting', config_schema);


module.exports = config_settings;
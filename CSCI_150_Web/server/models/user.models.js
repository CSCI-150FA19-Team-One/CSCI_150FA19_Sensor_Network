const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const user_schema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		maxlength: 12,
		minlength: 4,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	tokens: [
		{
			token: {type: String}
		}
	] 

});

user_schema.plugin(uniqueValidator);
const User = mongoose.model('User', user_schema);
module.exports = User;
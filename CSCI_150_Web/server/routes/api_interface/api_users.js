const express = require('express');
const router = express.Router();
const User = require('../../models/user.models.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const jsonParser = bodyParser.json();


const Salts = 10;


//create a new user
router.post('/register', jsonParser,  (req, res) => {

	bcrypt.genSalt(Salts, (err, salt) => {
		if(err) { return res.status(400).send(err);}

		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err) { return res.status(500).send(err);}

			const user = new User({
				username: req.body.username,
				password: hash
			});

			user.save((err, docs) => {
				if(err) {return res.sendStatus(500);}
				else return res.status(200).send(docs);
			});

		});


	});
});



//finding a user based on username since it must be unique
//Then checking if supplied plaintext password is the same
//as the hashed one.
router.post('/login', jsonParser,  (req, res) => {
	filter = {
		username: req.body.username
	}

	User.findOne(filter, (err, docs) => {
		if(err) {
			return res.status(422);
		}

		const hashedPW = docs.password;

		//If passwords match, the result is set to True
		bcrypt.compare(req.body.password, hashedPW, (err, result) => {
			if(result) {
				return res.status(200).send(docs);
			}
			else{
				return res.status(500);
			}
		});
	});

});



/*

signup -> login -> receive token -> sign out -> delete token

signup -
	check to see if database matches the passed username

login -
	compare non-hashed password with the hashed password to make sure
	it is correct

	check if a user already has an auth token

receive token -
	update the database putting in the token

	should token ever expire? -> if not make an api that allows someone
	to get a new token

sign out -
	only needed if receive token is not permenant



database API will require the token to be present in the query

*/

module.exports = router;

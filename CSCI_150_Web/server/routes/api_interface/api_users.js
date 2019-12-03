const express = require('express');
const router = express.Router();
const User = require('../../models/user.models.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jsonParser = bodyParser.json();


const Salts = 10;
const SecretKey = "nodesensor";


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

			//If user already exists in the database, it will return err
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

		console.log("found matching document with match username!");
		const hashedPW = docs.password;



		//If passwords match, the result is set to True
		bcrypt.compare(req.body.password, hashedPW, (err, result) => {
			if(result) {

				//create a token
				const token = jwt.sign(
					{username: docs.username}, 
					SecretKey,
					{expiresIn: "90 minutes"},
					);

				//place token into the database
				User.updateOne(filter, {$set: {'tokens': {token: token}}}, (err, result) => {
						if(err){
							console.log("There was an error inserting new token!");
							return res.status(421).json({"error": "error updating token value"});
						}
						return res.status(200).json({token: token});
					});
			}
			else{
				return res.status(500).json({"error": "passwords did not match!"});
			}
		}); //end of bcrypt

	}); //end of findOne


});//end of post login api



module.exports = router;

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

	if( req.body.username != null && req.body.password != null){
		bcrypt.genSalt(Salts, (err, salt) => {
			if(err) { return res.status(500).json({"error": "could not generate salt"});}
			else{
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					if(err){ return res.status(500).json({"error": "could not hash password!"});}
					else{

						const user = new User({
							username: req.body.username,
							password: hash
						}).save( (err,docs) => {
							if(err){ return res.status(500).json({
								"error": "username already exists!",
								"errorMessage": err});}
							return res.status(200).send(docs);			
						});

						/*
						const user = new User({
							username: req.body.username,
							password: hash
						});

						user.save((err, docs) => {
							if(err){ return res.status(500).json({"error": "username already exists!"});}
							return res.status(200).send(docs);
						});
						*/
					}
				}); //end of bcrypt hash
			}
		}); //end of bcrypt genSalt aysnc
	}
	else{
		return res.status(500).json({"error": "missing password or username!"});
	}
});




//finding a user based on username since it must be unique
//Then checking if supplied plaintext password is the same
//as the hashed one.
router.post('/login', jsonParser,  (req, res) => {

	if( req.body.username != null && req.body.password != null){
		
		filter = {
			username: req.body.username
		}

		User.findOne(filter, (err, docs) => {
			if(err) {			
				return res.status(422);
			}else if(docs === null){
				return res.status(500).json({'message': "Error! No user exists with that username!"});
			}else{

				//Retrieve hashed pw
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
			}
		}); //end of findOne
	}
	else{
		return res.status(500).json({"error": "missing either username or password"});
	}


});//end of post login api



module.exports = router;

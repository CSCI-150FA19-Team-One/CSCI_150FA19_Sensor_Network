const jwt = require('jsonwebtoken');
const User = require('./models/user.models.js');

const SecretKey = "nodesensor";


module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	//console.log("the token: " + token);
	//if no token is in the header
	if (token != undefined){
		User.findOne({"tokens.0.token": token}, (err, docs) => {
			if(docs){
				//console.log(docs.tokens[0].token);
				jwt.verify(docs.tokens[0].token, SecretKey, (err, revealedKey) => {
					if (err) {return res.json({"message": "failed!"});}
					next();
				});
			}
			else{
				//console.log(docs);
				return res.json({"message": "token not found in database!"});
			}
		});
	}
	else { return res.json({"message": "no token was supplied!"});}
};

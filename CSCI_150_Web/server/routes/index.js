const express = require('express');
const router = express.Router();

//A basic routing page
//app.get take in a callback function with two
//inputs response or request used to either get or send data.
router.get('/', (req, res) => {
	res.send('Showing that the root directory of webserver works')
});


module.exports = router;

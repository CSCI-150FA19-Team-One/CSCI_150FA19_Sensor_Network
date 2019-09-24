const express = require('express');
const router = express.Router();
const upload_route = require('./data_uploads.js');

//Anything that visits the upload URI gets sent the route from data_upload.js
router.use('/data_upload', upload_route);


//A basic routing page
//** IMPORTANT, creating a route at the root path of this Router
router.get('/', (req, res) => {
	res.send('Showing that the root directory of webserver works')
});




module.exports = router;

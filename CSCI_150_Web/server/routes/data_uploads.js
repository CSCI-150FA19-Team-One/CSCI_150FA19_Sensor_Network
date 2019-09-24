const express = require('express');
const router = express.Router();
const busboy = require('connect-busboy'); // for file uploads, middleware
const path = require('path');
const fs = require('fs');

//Middleware to be used
router.use(busboy());

// Routing for the webpage where files will be uploaded to the server
// once it has been visited.
router.get('/', (req, res) => {
	res.send('Showing that this path works');
});

/*
router.post('/', (req, res) => {
	var file_stream;
	req.pipe(req.busboy);
	req.busboy.on('file', function(fieldName, file, fileName) {
		var file_path = path.join(__dirname, '/../temp_files/', fileName);
		fstream = fs.createWriteStream(file_path);
		file.pip(fstream);
		fstream.on('close', () => {
			console.log(`The file has been saved at:  ${file_path}`);
		});
	});
});
*/

module.exports = router;
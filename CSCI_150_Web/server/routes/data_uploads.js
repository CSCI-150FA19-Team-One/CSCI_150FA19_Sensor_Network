const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');


const save_path = path.join(__dirname, '/../temp_files'); // change
const upload_page = path.join(__dirname, '/../../client/upload.html');

// Routing for the webpage where files will be uploaded to the server
// once it has been visited.




//First visit to the URL - '/' == '/data_upload'
router.get('/', (req, res) => {
	res.sendFile(upload_page);
});


//POST request, action that takes place when a file is submitted
router.post('/', (req, res) => {
	const form = new formidable.IncomingForm()
	form.parse(req)

	//Emitted when a new file has been detected in the file upload stream
	form.on('fileBegin', (name, file) => {
		file.path = path.join(save_path, file.name);
		console.log(`Uploading to file path: ${save_path}`);
	});

	//Emitted whenever a field/file pair has been received
	form.on('file', (name, file) => {
		console.log(`Uploading: ${file.name}`);
	});

	form.on('error', (err) => {
		console.log("ERROR!", err);
	});

	//Resend the visitor page when file has been uploaded
	form.on('end', () => {
		res.sendFile(upload_page);
		console.log("SUCESS!");
	})

});

module.exports = router;
const express = require('express');
const router = express.Router();
const busboy = require('connect-busboy'); // for file uploads, middleware
const file_path = require('path');
const fs = require('fs');



router.get('/data_uploads', (req, res) => {
	res.send('Showing that this path works');
});

/*
//The file name will depend on the html code
//For now assume it is called readings
app.post('/data_uploads', (res,req) => {
	if(req.busboy){
		req.busboy.on('file', function(fieldName, file, fileName){
			var fstream = fs.createWriteStream((path.join(__dirname, '/test_files', fileName)));

		});
	}



});
*/


module.exports = router;
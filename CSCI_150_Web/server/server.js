//3rd party modules
const express = require('express');
const app = express();

//Local modules
const routes = require('./routes');
const grab_data = require('./data_fetch.js');


// The port which the web server will start on
const port = 3000;


// Connects all routes to the app
// Anything that visits '/' URI gets sent to the routers defined in 
// routes directory
app.use('/', routes);


//Timer event, makes requests to all the sensor devices that
//are found in config.json
setInterval(grab_data.loop_through_devices, 3000);



//Starts the server on specified port
app.listen(port, () => {
	console.log(`Express server started on port: ${port}` );
});











//3rd Party Packages
const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const database_data = require('./models/data.models.js');


//Local modules
const fetch = require('./data_fetch.js');
const routes = require('./routes/api_interface/api.js');
const settings = require('./config.json');



app.use('/', routes)




/*********** MONGOSE CONNECCTION **********************/

//Connect to MongoDB
mongoose.connect(settings.mongoDB_path, {useNewUrlParser: false,useUnifiedTopology: true});

//Getting the DB object
const db = mongoose.connection;

//If couldn't connect to database, output error
db.on('error', console.error.bind(console, "MongoDB error"));

db.on('open', () => {
	console.log("Connected to mongodb!");
});


/************ MONGOOSE CONNECTION *********************/





setInterval(fetch.loop_through_devices, 30000);




/********* START WEB SERVER ***************************/
app.listen(3000, () => {
	console.log("Express server is currently running.");
})


/********* WEB SERVER ********************************/




/*

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
setInterval(grab_data.loop_through_devices, 10000);



//Starts the server on specified port
app.listen(port, () => {
	console.log(`Express server started on port: ${port}` );
});








*/


//3rd Party Packages
const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const database_data = require('./models/data.models.js');
const bodyParser = require('body-parser');


//Local modules
const fetch = require('./data_fetch.js');
const routes = require('./routes/api_interface/api.js');
const userRoutes = require('./routes/api_interface/api_users.js');
const localRoutes = require('./routes/api_interface/api_local.js');
const settings = require('./config.json');


app.use('/', routes);
app.use('/user', userRoutes);
app.use('/frontend', localRoutes);




/*********** MONGOSE CONNECCTION **********************/
//"mongodb://127.0.0.1:27017"
//"mongodb+srv://admin:password1234@nodesensor-jdaif.azure.mongodb.net/test?retryWrites=true&w=majority"

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




setInterval(fetch.loop_through_devices, 180000);






/********* START WEB SERVER ***************************/
app.listen(3000, () => {
	console.log("Express server is currently running.");
})


/********* WEB SERVER ********************************/


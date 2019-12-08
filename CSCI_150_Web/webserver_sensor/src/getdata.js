const mongoose = require('mongoose');
//It will be 127.0.0.1 
const url = "mongodb://108.211.45.253:60003";


mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});

//Getting the DB object
const db = mongoose.connection;

//If couldn't connect to database, output error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to mongodb!");
});

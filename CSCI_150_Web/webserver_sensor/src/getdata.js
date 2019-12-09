const mongoose = require('mongoose');
//It will be 127.0.0.1 
const url = "mongodb://108.211.45.253:60003";


mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});

//Getting the DB object
const connection = mongoose.connection;

//If couldn't connect to database, output error
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log("Connected to mongodb!");
    connection.db.collection("devicesdatas", function(err, collection){
        collection.find({year_timestamp:"2019" , deviceID:"e00fce681c2671fc7b1680eb",name:"tempF"}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });
    console.log("done!")
});


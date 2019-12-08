const mongoose = require('mongoose');
const url = "mongodb://108.211.45.253:60003";

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});

//Getting the DB object
const db = mongoose.connection;

//If couldn't connect to database, output error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to mongodb!");
});
///////////////////////////////////////////////////////////////////////////////////////////

// const mongoose = require('mongodb').MongoClient;
// const url = "mongodb://108.211.45.253:60003";

// mongo.connect(url, {
//     useNewUrlParser: false,
//     useUnifiedTopology: true
//   }, (err, client) => {
//   if (err) {
//     console.error(err)
//     return
//   }

// })

///////////////////////////////////////////////////////////////////////////////////////////////

// const mongoose = require('mongodb').MongoClient;
// const url = "mongodb://108.211.45.253:60003";

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://108.211.45.253:60003/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("DevicesData");
//   dbo.bios.find().toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

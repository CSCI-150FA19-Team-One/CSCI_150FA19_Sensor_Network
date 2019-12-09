const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

// Connection URL
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://108.211.45.253:60003'
// Database Name
const dbName = 'admin';



// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//     client.close();
// });

// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
    // Use the admin database for the operation
    const adminDb = client.db(dbName)//.admin();
    // List all the available databases
    adminDb.listCollections().toArray(function(err, items) {
      test.equal(null, err);
      test.ok(items.length > 0);
      //console.log(items)
      adminDb.collection('devicesdatas').findOne({},function(err,data){
     console.log(data)
        client.close();
      });

    });
});

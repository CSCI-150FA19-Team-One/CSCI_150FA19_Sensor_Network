const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

// Connection URL
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://108.211.45.253:60003'
// Database Name
const dbName = 'admin';

const filter = {
  deviceID: 'e00fce681c2671fc7b1680eb',
  name: 'tempF'
}

// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
    // Use the admin database for the operation
    const adminDb = client.db(dbName)//.admin();
    // List all the available databases
    adminDb.listCollections().toArray(function(err, items) {
      test.equal(null, err);
      test.ok(items.length > 0);
      const current_date = new Date();
      const number_month = current_date.getMonth() + 1;
      const number_day = current_date.getDate();
      const current_month = number_month.toString();
      const current_day = number_day.toString();
      
      //console.log(items)
      adminDb.collection('devicesdatas').find({}).toArray(function(err,data){
     console.log(data[0].results.month[current_month].day[current_day])
        client.close();
      });
    });
});

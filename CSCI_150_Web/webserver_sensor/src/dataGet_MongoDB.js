const MongoClient = require('mongodb').MongoClient;
const settings = require('./config.json');
// Connection URL
const url = 'mongodb://108.211.45.253:60003'
// Database Name
const dbName = settings.dbName;

const filter = {
    deviceID: 'e00fce681c2671fc7b1680eb',
    name:'tempF'
}


// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
    const adminDb = client.db(dbName)
    adminDb.collection('devicesdatas').find(filter).toArray(function(err,data){
        console.log(data[0].results.month['11'].day['18'])
        const current_date = new Date();
        console.log(current_date)
        client.close();
    });
});

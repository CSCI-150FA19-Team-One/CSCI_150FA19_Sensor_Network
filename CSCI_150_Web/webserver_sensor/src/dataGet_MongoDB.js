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

    const current_date = new Date();
    const number_month = current_date.getMonth() + 1;
    const number_day = current_date.getDate();
    const current_month = number_month.toString();
    const current_day = number_day.toString();

    adminDb.collection('devicesdatas').find(filter).toArray(function(err,data){
        console.log(data[0].results.month[current_month].day[current_day])
        const current_date = new Date();
        console.log(current_date)
        client.close();
    });
});

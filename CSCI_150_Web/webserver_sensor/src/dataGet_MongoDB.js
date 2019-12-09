const MongoClient = require('mongodb').MongoClient;
const settings = require('./config.json');
// Connection URL
const url = 'mongodb://108.211.45.253:60003'
// Database Name
const dbName = settings.dbName;

const filter = {
    deviceID: 'e00fce681c2671fc7b1680eb',
    name: 'tempF'
}

const current_date = new Date();
const number_month = current_date.getMonth() + 1;
const number_day = current_date.getDate();
const current_month = number_month.toString();
const current_day = number_day.toString();

// Connect using MongoClient

// async function dataDaseAccess() { 
//     //new Promise()
//     return await MongoClient.connect(url, async function (err, client) {
//         const adminDb = client.db(dbName)
//         return await adminDb.collection('devicesdatas').find(filter).toArray(function (err, data) {
//             console.log(data[0].results.month[current_month].day[current_day])
//             client.close();
//             return data[0].results.month[current_month].day[current_day]
//         });
//     });
// }

function dataDaseAccess(filter) { 
 return MongoClient.connect(url).then(client=>{
    const adminDb = client.db(dbName)
    return adminDb.collection('devicesdatas').find(filter).toArray().then(data=>{
        //console.log(data[0].results.month[current_month].day[current_day])
        client.close();
        return data[0].results.month[current_month].day[current_day]
    })
 })
}

dataDaseAccess(filter).then(function(value){
    console.log(value)
})


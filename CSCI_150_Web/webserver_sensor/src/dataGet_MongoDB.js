const MongoClient = require('mongodb').MongoClient;
//const BSON = require('bson')
const settings = require('./config.json');
const _ = require('lodash');
//var bson = new BSON([BSON.Binary, BSON.Code, BSON.DBRef, BSON.Decimal128, BSON.Double, BSON.Int32, BSON.Long, BSON.Map, BSON.MaxKey, BSON.MinKey, BSON.ObjectId, BSON.BSONRegExp, BSON.Symbol, BSON.Timestamp]);


// Connection URL
const url = 'mongodb://108.211.45.253:60003'
// Database Name
//const dbName = settings.dbName;


// const current_date = new Date();
// const number_month = current_date.getMonth() + 1;
// const number_day = current_date.getDate();
// const current_month = number_month.toString();
// const current_day = number_day.toString();

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



 function dataDaseAccess(url, filter) {
    return MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
        const adminDb = client.db(settings.dbName)
        return adminDb.collection('devicesdatas').find(filter).toArray().then(data => {
            client.close();
            return data
        })
    })
}

 function myfilterdata(values, filter) {
    const current_date = new Date();
    const number_month = current_date.getMonth() + 1;
    const number_day = current_date.getDate();
    const current_month = number_month.toString();
    const current_day = number_day.toString();

    var data = []

    _.map(_.filter(values, filter)[0]
        .results
        .month[current_month]
        .day[current_day],function(obj){
            //console.log(obj.gatheredAt,obj.value)
            data.push({'x':obj.gatheredAt, 'y':obj.value})
            //value.push({'y':obj.value})
        })
        //console.log(data)
        return data
}

const filter = {
    deviceID: settings.device_ID[0], //0-2
    name: settings.sensor[3], //0-4
    year_timestamp: '2019'
}

dataDaseAccess(url, filter).then(values => {
    //console.log(_.filter(values, {'deviceID': settings.device_ID[0] ,name: settings.sensor[0]})[0])
    console.log(myfilterdata(values, filter))
})

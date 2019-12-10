//const mymodule = require('./dataGet_MongoDB')
const settings = require('./config.json');

const filter = {
    deviceID: settings.device_ID[0], //0-2
    name: settings.sensor[0], //0-4
    year_timestamp: '2019'
}

const url = 'mongodb://108.211.45.253:60003' //temp
mymodule.dataDaseAccess(url, {}).then(values => {
    console.log(mymodule.myfilterdata(values, filter))
})

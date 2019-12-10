const settings = require('./config.json');
const _ = require('lodash');
const fetch = require('node-fetch');

//"http://localhost:3000/frontend/find/2019?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF"
//"http://108.211.45.253:60005/frontend/find/2019?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF"
//const baseurl = "http://108.211.45.253:60005/frontend/find/2019?"

function mydataprep(values) {
    const current_date = new Date();
    const number_year = current_date.getFullYear()-1;
    const number_month = current_date.getMonth() + 1;
    const number_day = current_date.getDate();
    const current_month = number_month.toString();
    const current_day = number_day.toString();

    var data = []
    _.map(values.results
        .month[current_month]
        .day[current_day],function(obj){
            var dt = obj.gatheredAt.split(":")
            var d = new Date(number_year+1,number_month-1,number_day,dt[0],dt[1])
            data.push({'x':d,'y':Math.round(obj.value)})
            //value.push({'y':obj.value})
        })
        //console.log(data)
        return data
}


async function dataRequest(baseurl, deviceIdx, sensorSTR) {
    const url = baseurl + "deviceID=" + settings.device_ID[deviceIdx] + "&sensor=" + sensorSTR
    const response = await fetch(url)//.catch(err => console.error(err));
    const data = await response.json();
    //console.log(mydataprep(data))
    return mydataprep(data)
}

// dataRequest(settings.baseurl, 0, 0).then(data =>{
//     console.log(data)
// })

export {dataRequest}
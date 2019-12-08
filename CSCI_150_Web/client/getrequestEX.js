const https = require('http')

//http://108.211.45.253:60005/find/2019/11/17?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF

const options = {
  hostname: '108.211.45.253',
  port: 60005,
  path: '/find/2019/11/18?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF',
  method: 'GET'
}
var response = ""
const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    response += d;
    console.log(response);
    response = JSON.parse(response);
    console.log(response)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
const https = require("http");

const options = {
  hostname: "108.211.45.253",
  port: 60005,
  path: "/find/2019/11/18?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF",
  method: "Get"
};

var getTime = "";

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", d => {
    getTime += d;
    console.log(getTime);
    console.log(typeof getTime);
  });
});

req.on("error", error => {
  console.error(error);
});

req.end();

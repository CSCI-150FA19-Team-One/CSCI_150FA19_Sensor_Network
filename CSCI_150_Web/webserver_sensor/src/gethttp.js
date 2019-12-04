import React, { Component } from "react";
// import PropTypes from "prop-types";

class GetData extends Component {
  render() {
    // var m = 11;
    // var d = 18;
    var grabData = "";

    const https = require("http");

    const dest = {
      hostname: "108.211.45.253",
      port: 60005,
      path: "/find/2019/11/20?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF",
      method: "Get"
    };

    const req = https.request(dest, res => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on("data", d => {
        grabData += d;
        console.log(grabData)
      });
    });

    req.on("error", error => {
      console.error(error);
    });

    req.end();

  return <div>{grabData}</div>;
  }
}

export default GetData;

// const dest = {
//   hostname: "108.211.45.253",
//   port: 60005,
//   path: "/find/2019/" + m + "/" + d + "?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF",
//   method: "Get"
// };

// var grabData = "";

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on("data", d => {
//     grabData += d;
//     console.log(grabData);
//     console.log(typeof grabData);
//   });
// });

// req.on("error", error => {
//   console.error(error);
// });

// req.end();

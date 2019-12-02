import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GetData extends Component {
  var m = 11;
  var d = 18;
  var grabData = "";

  setDest = () => {
    const dest = {
      hostname: "108.211.45.253",
      port: 60005,
      path: "/find/2019/" + m + "/" + d + "?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF",
      method: "Get"
    };
  }

  render() { 
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
    
      res.on("data", d => {
        getTime += d;
      });
    });
    
    req.on("error", error => {
      console.error(error);
    });
    
    req.end();

    return ( 
      console.log(getTime)
    );
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
//     getTime += d;
//     console.log(getTime);
//     console.log(typeof getTime);
//   });
// });

// req.on("error", error => {
//   console.error(error);
// });

// req.end();

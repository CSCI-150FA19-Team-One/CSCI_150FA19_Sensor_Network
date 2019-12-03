import React from 'react';
// import React, { Component } from "react";
// import { render } from "react-dom";
import Clock from "react-live-clock";
// import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

import Tabs from "./tabs.js";
import GetData from "./gethttp.js";
import NavBar from "./navbar.js"

require("./App.css");

// const http = require("http");
// const https = require("https");

// let m = 11;
// let d = 19;
// var url = "http://108.211.45.253:60005/find/2019/" + m + "/" + d + "?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF";

function App() {
  return (
    <div>
          <NavBar></NavBar>
      <h1>Home</h1>
      <h3>
        <Clock
          format={"dddd, MMMM Do YYYY, HH:mm:ss A"}
          ticking={true}
          timezone={"US/Pacific"}
        />
      </h3>
      <Tabs>
        <div label="Average of Data">
          Graph of Temperature, Moisture, and Humidity Averaged
          <GetData></GetData>
        </div>
        <div label="Temperature">Graph of Temperature</div>
        <div label="Moisture">Graph of Moisture</div>
        <div label="Humidity">Graph of Humidity</div>
      </Tabs>
    </div>
  );
}

export default App;

// const container = document.createElement('div');
// document.body.appendChild(container);
// render(<App />, container);

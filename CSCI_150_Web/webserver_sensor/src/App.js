import React from 'react';
//import ReactRC, { Component } from "react";
// import { render } from "react-dom";
import Clock from "react-live-clock";
// import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

import Tabs from "./tabs.js";
//import GetData from "./gethttp.js";
import NavBar from "./navbar.js";
//import Charter from "./charter.js";

require("./App.css");

function App() {
  return (
    <div>
          <NavBar></NavBar>
      <h3 className="text-center">
        <Clock
          format={"dddd, MMMM Do YYYY, HH:mm:ss A"}
          ticking={true}
          timezone={"US/Pacific"}
        />
      </h3>
    
      <Tabs>
        <div label="Average of Data">
          Graph of Temperature, Moisture, and Humidity Averaged
        </div>
        <div label="Temperature">Graph of Temperature
        </div>
        <div label="Moisture">Graph of Moisture
        </div>
        <div label="Humidity">Graph of Humidity
        </div>
      </Tabs>
    </div>
  );
}

export default App;

// const container = document.createElement('div');
// document.body.appendChild(container);
// render(<App />, container);

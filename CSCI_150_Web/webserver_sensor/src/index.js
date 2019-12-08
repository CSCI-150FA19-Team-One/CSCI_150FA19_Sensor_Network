import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import $ from "jquery";
import CanvasJS from "./canvasjs.min.js"

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

require('./navbar.css')
require('./searchpanel.css')

window.onload = function () {

    var dps = []; // dataPoints
    const chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Sensor Node 1"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: dps
        }]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 12000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {

        count = count || 1;

        for (var j = 0; j < count; j++) {
            yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }

        if (dps.length > dataLength) {
            dps.shift();
        }

        chart.render();
    };

    updateChart(dataLength);
    setInterval(function () { updateChart() }, updateInterval);

    //
    document.getElementById("showtempC").onclick = function () {
        const showTempCVal = document.getElementById('showtempC').checked
        console.log(showTempCVal);
    }

    document.getElementById("openNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "250px";
    }

    document.getElementById("closeNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "0";
    }


}



const App = () => (<>
    <Navbar bg="light">
        <Navbar.Brand href="#home">Brand link</Navbar.Brand>
    </Navbar>

    <div id="mySidenav" class="sidenav">
        <h2>Config</h2>
        <a href="javascript:void(0)" class="closebtn" id='closeNav'>&times;</a>
        <div>
            <input type="checkbox" id="showtempC" name="showtempC" />
            <label for="showtempC">TempC</label>
        </div>
        <div>
            <input type="checkbox" id="showtempF" name="showtempF" />
            <label for="showtempF">TempF</label>
        </div>
        <div>
            <input type="checkbox" id="showhumidity" name="showhumidity" />
            <label for="showhumidity">Humidity</label>
        </div>
        <div>
            <input type="checkbox" id="showgroundmoisture" name="showgroundmoisture" />
            <label for="showgroundmoisture">Ground Moisture</label>
        </div>
    </div>
    
    <span styles="font-size:30px;cursor:pointer" id="openNav">&#9776; Config</span>
    <Container>

        <Row>
            <Col> 
                <div id="chartContainer" styles="height: 370px; max-width: 920px; margin: 0px auto;"></div>
            </Col>

            <Col>Sensor Select
            <div class="vertical-menu">
                    <a href="#" class="active">Home</a>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                    <a href="#">Link 4</a>
                    <a href="#">Link 5</a>
                    <a href="#">Link 6</a>
                    <a href="#">Link 7</a>
                    <a href="#">Link 8</a>
                    <a href="#">Link 9</a>
                    <a href="#">Link 10</a>
                </div>
            </Col>
        </Row>

    </Container>
</>)


ReactDOM.render(<App />, document.getElementById('root'));

//imports
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Clock from "react-live-clock";
import CanvasJSReact from './canvasjs.react';
import "bootstrap/dist/css/bootstrap.min.css";

//requires
require("./navbar.css");
const settings = require('./config.json');
const DG = require('./dataGet_Fetch')
//const _ = require('lodash');



//graph variables
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const current_date = new Date();
const number_year = current_date.getFullYear()-1;
const number_month = current_date.getMonth() + 1;
const number_day = current_date.getDate();
var d = new Date(number_year+1,number_month-1,number_day,0,0)

var currentNode = 0 //node 1 selected first
var dataPointsTempC = [{x:d,y: 0}]; //sensor 0
var dataPointsTempF = [{x:d,y: 0}]; // sensor 1
var dataPointsHumidity = [{x:d,y: 0}]; //sensor 3
var dataPointsGroundMoisture = [{x:d,y: 0}]; //sensor 4
const updateInterval = settings.updateInterval; //3min
let myrefer = null;


function insertData(currentSensor) {
    //note sensornodes = 0-2                  //for readability
    DG.dataRequest(settings.baseurl, currentSensor, "tempC").then(data => {
        dataPointsTempC = data
        //console.log('first')
        //console.log(dataPointsTempC)
    })
    DG.dataRequest(settings.baseurl, currentSensor, "tempF").then(data => {
        dataPointsTempF = data
    })
    DG.dataRequest(settings.baseurl, currentSensor, "HumidityT").then(data => {
        dataPointsHumidity = data
    })
    DG.dataRequest(settings.baseurl, currentSensor, "GMoistureP").then(data => {
        dataPointsGroundMoisture = data
        console.log("data got")

    })
    
}


//after page has loaded//
window.onload = function () {
    console.log('ready')
    setTimeout(function(){console.log("delay done"); myrefer.updateChart(0)}, 2500)
    console.log('ready ready')
    // Get the container element
    var menuContainer = document.getElementById("btnSelect");

    // Get all buttons with class="btn" inside the container
    var selected = menuContainer.getElementsByClassName("btn");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < selected.length; i++) {
        selected[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            //console.log(current[0].attributes)
            myrefer.chart.options.title.text = current[0].attributes.name.value
            //console.log(Number(current[0].attributes.idnum.value))
            currentNode = Number(current[0].attributes.idnum.value)
            //console.log(currentNode)
            insertData(currentNode)
            setTimeout(myrefer.updateChart(0),1000)
        });
    }

    document.getElementById("showtempC").checked = true;

    document.getElementById("showtempC").onclick = function () {
        const showTempCVal = document.getElementById("showtempC").checked;
        myrefer.chart.options.data[0].visible = showTempCVal
        myrefer.chart.render()
        //console.log(showTempCVal)
            // if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            //     e.dataSeries.visible = false;
            // }
            // else {
            //     e.dataSeries.visible = true;
            // }
            // //console.log(e)
            // e.chart.render();
    };

    document.getElementById("showtempF").checked = true;

    document.getElementById("showtempF").onclick = function () {
        const showTempFVal = document.getElementById("showtempF").checked;
        myrefer.chart.options.data[1].visible = showTempFVal
        myrefer.chart.render()
    };

    document.getElementById("showhumidity").checked = true;

    document.getElementById("showhumidity").onclick = function () {
        const showhumidityVal = document.getElementById("showhumidity").checked;
        myrefer.chart.options.data[2].visible = showhumidityVal
        myrefer.chart.render()
    };

    document.getElementById("showgroundmoisture").checked = true;

    document.getElementById("showgroundmoisture").onclick = function () {
        const showgroundmoistureVal = document.getElementById("showgroundmoisture").checked;
        myrefer.chart.options.data[3].visible = showgroundmoistureVal
        myrefer.chart.render()
    };

    document.getElementById("openNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };

    document.getElementById("closeNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
};

//classes

class DynamicMultiSeriesChart extends Component {
    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
        myrefer = this;
        //console.log(myrefer)
    }
    componentDidMount() {
        this.updateChart(0);
        setInterval(this.updateChart, updateInterval);
    }

    updateChart(count) {
        count = count || 1;
        insertData(currentNode)

        this.chart.options.data[0].dataPoints = dataPointsTempC
        this.chart.options.data[1].dataPoints = dataPointsTempF
        this.chart.options.data[2].dataPoints = dataPointsHumidity
        this.chart.options.data[3].dataPoints = dataPointsGroundMoisture
        //this.chart.options.data[0].legendText = null//"Current " + yValue1 + " km/h";
        //this.chart.options.data[1].legendText = null//" Lamborghini Aventador - " + yValue2 + " km/h";
        this.chart.render();
    }
    render() {
        const options = {
            zoomEnabled: true,
            theme: "light2",
            title: {
                text: "Sensor Node 1"
            },
            axisX: {
                title: "Time",
                includeZero: true
            },
            axisY: {
                suffix: " C°/F°/%",
                includeZero: true
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                fontSize: 15,
                fontColor: "dimGrey",
                itemclick: function (e) {
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.dataSeries.visible = true;
                    }
                    //console.log(e)
                    e.chart.render();
                }
            },
            data: [
                {
                    type: "line",
                    xValueType: "dateTime",
                    xValueFormatString: '',
                    yValueFormatString: "#,##0 C°",
                    showInLegend: true,
                    name: "TempC",
                    dataPoints: dataPointsTempC
                },
                {
                    type: "line",
                    xValueFormatString: "#,##0 seconds",
                    yValueFormatString: "#,##0 F°",
                    showInLegend: true,
                    name: "TempF",
                    dataPoints: dataPointsTempF
                },
                {
                    type: "line",
                    xValueFormatString: "#,##0 seconds",
                    yValueFormatString: "#,##0 '%'",
                    showInLegend: true,
                    name: "Humidity",
                    dataPoints: dataPointsHumidity
                },
                {
                    type: "line",
                    xValueFormatString: "#,##0 seconds",
                    yValueFormatString: "#,##0 '%'",
                    showInLegend: true,
                    name: "GroundMoisture",
                    dataPoints: dataPointsGroundMoisture
                },
            ]
        }

        return (
            <div>
                <CanvasJSChart  options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}


const App = () =>
    <>
        <Navbar bg="light">
            <Navbar.Brand href="#home">Sensor Network Project</Navbar.Brand>
        </Navbar>

        {/* open Config menu */}
        <span class="mouseSelect" id="openNav"> &#9776; Config </span>

        {/* Side nav setup */}
        <div id="mySidenav" class="sidenav">
            <h2 id="sideNavTitle">Config</h2>
            <a class="closebtn" id="closeNav"> &times;</a>
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

        <Container>
            <Row>
                <Col align="left" >
                    {/* clock displayed here */}
                    <h3 className="text-center">
                        <Clock
                            format={"dddd, MMMM Do YYYY, HH:mm:ss A"}
                            ticking={true}
                            timezone={"US/Pacific"}
                        />
                    </h3>
                    {/* chart is displayed here */}
                    <DynamicMultiSeriesChart id = "test"/>
                </Col>
                <Col className="text-center" align="right" md="auto">
                    <h5>Sensor Node Select</h5>
                    <div class="vertical-menu" id="btnSelect">
                        <button class="btn active" IDnum ="0" name="Sensor Node 1">Sensor Node 1</button>
                        <button class="btn" IDnum ="1" name="Sensor Node 2">Sensor Node 2</button>
                        <button class="btn" IDnum ="2" name="Sensor Node 3">Sensor Node 3</button>
                    </div>
                </Col>
            </Row>
        </Container>
    </>

ReactDOM.render(<App />, document.getElementById("root"));

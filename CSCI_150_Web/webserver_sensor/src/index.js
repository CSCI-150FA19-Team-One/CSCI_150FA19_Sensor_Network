import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Clock from "react-live-clock";
import CanvasJSReact from './canvasjs.react';

//import DynamicMultiSeriesChart from "./displayCharts"

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

require("./navbar.css");
const settings = require('./config.json');

//graph variables
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints1 = [];
var dataPoints2 = [];
var updateInterval = 2000;
//initial values
var yValue1 = 408;
var yValue2 = 350;
var xValue = 5;

const test = 20

window.onload = function () {
// Get the container element
var menuContainer = document.getElementById("btnSelect");

// Get all buttons with class="btn" inside the container
var selected = menuContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < selected.length; i++) {
  selected[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    // console.log(current[0].attributes.name)
    // var graphName = current[0].attrubutes.name
  });
}


    document.getElementById("showtempC").checked = false;

    document.getElementById("showtempC").onclick = function () {
        const showTempCVal = document.getElementById("showtempC").checked;
        console.log(showTempCVal);
    };

    document.getElementById("showtempF").checked = true;

    document.getElementById("showtempF").onclick = function () {
        const showTempCVal = document.getElementById("showtempF").checked;
        console.log(showTempCVal);
    };

    document.getElementById("showhumidity").checked = true;

    document.getElementById("showhumidity").onclick = function () {
        const showTempCVal = document.getElementById("showhumidity").checked;
        console.log(showTempCVal);
    };

    document.getElementById("showgroundmoisture").checked = false;

    document.getElementById("showgroundmoisture").onclick = function () {
        const showTempCVal = document.getElementById("showgroundmoisture").checked;
        console.log(showTempCVal);
    };

    document.getElementById("openNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };

    document.getElementById("closeNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
};



class DynamicMultiSeriesChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);		
	}
	componentDidMount(){
		this.updateChart(test);
		setInterval(this.updateChart, updateInterval);
	}
	
	updateChart(count) {
		count = count || 1;		
		for (var i = 0; i < count; i++) {
			xValue += 2;
			yValue1 = Math.floor(Math.random()*(408-400+1)+400);
			yValue2 = Math.floor(Math.random()*(350-340+1)+340);
			dataPoints1.push({
			  x: xValue,
			  y: yValue1
			});
			dataPoints2.push({
			  x: xValue,
			  y: yValue2
			});
		}
		this.chart.options.data[0].legendText = "Current " + yValue1 + " km/h";
		this.chart.options.data[1].legendText = null//" Lamborghini Aventador - " + yValue2 + " km/h";
		this.chart.render();
	}
	render() {
		const options = {
			zoomEnabled: true,
			theme: "light2",
			title: {
				text: "Sensor Node Network"
			},
			axisX: {
				title: "chart updates every 2 secs"
			},
			axisY:{
				suffix: " km/h",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
				itemclick : function(e){
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else {
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
			},
			data: [
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Bugatti Veyron",
					dataPoints: dataPoints1
				},
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Lamborghini Aventador" ,
					dataPoints: dataPoints2
				}
			]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
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
            <a href="javascript:void(0)" class="closebtn" id="closeNav"> &times;</a>
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
                <input type="checkbox" id="showgroundmoisture" name="showgroundmoisture" checked='false' />
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
                    <DynamicMultiSeriesChart/>
                </Col>
                <Col className="text-center" align="right" md="auto">
                    <h5>Sensor Node Select</h5>
                    <div class="vertical-menu" id="btnSelect">
                        <button class="btn active" name="Sensor Node 1">Sensor Node 1</button>
                        <button class="btn" name="Sensor Node 2">Sensor Node 2</button>
                        <button class="btn" name="Sensor Node 3">Sensor Node 3</button>
                    </div>
                </Col>
            </Row>
        </Container>
    </>

ReactDOM.render(<App />, document.getElementById("root"));

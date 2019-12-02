import 'dart:async';
import 'dart:convert';
//import 'package:sensor_network_monitor/widgets_test.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

//Create global query class variable q
query q = new query();

//runs the program
void main() => runApp(MyApp());

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

//Unused, Demo class
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: new Center(
        child: new MyLogoWidget(),
      )

      //floatingActionButton: FloatingActionButton(
       // onPressed: _incrementCounter,
        //tooltip: 'Increment',
        //child: Icon(Icons.add),
      //), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
*/

//Collects Sensor Data
class Data
{
  final String userID;
  final String deviceID;
  final String name;
  final String version;

  Data._({this.userID, this.deviceID, this.name, this.version});

  factory Data.fromJson(Map<String, dynamic> json)
  {
    return new Data._(
      userID: json['_id'],
      deviceID: json['deviceID'],
      name: json['title'],
      version: json['_v'],
    );
  }
} //END DATA CLASS

//Collects Results Data
class DataResults
{
  final String gatheredAt;
  final double value;
  String valueStr;

  DataResults._({this.gatheredAt,this.value});

  factory DataResults.fromJson(Map<String, dynamic> json)
  {
    return new DataResults._(
      gatheredAt: json['gatheredAt'],
      value: json['value'].toDouble(),
    );
  }
} //END REULTS CLASS

class query {
//Date Query Variables
  int year=null;
  int month=null;
  int day=null;
  int hour=null;
  String y;
  String m;
  String d;
  String h;

  //Sensor Query Variables
  bool tempInF = true;
  bool humidityInT = true;

//Device Query Variables
  String device=null; //"e00fce681c2671fc7b1680eb", "e00fce686522d2441e1f693f", "e00fce68b1b49ccf2e314c17"
  String sensor=null; //"tempC", "tempF", "HumidityL", "HumidityT"
}//END QUERY CLASS

//Creates the dynamic http path for the data of a specific day (current day only right now)
String makePath()
{
//Build Year, Month, Day Variables. If null, fill the variables
  if(q.year != null)
  {
    q.y = q.year.toString();
  }
  else
  {
    q.year = new DateTime.now().year; //Default Case
    q.y = q.year.toString();
  }

  if(q.month != null)
  {
    q.m = q.month.toString();
  }
  else
  {
    q.month = new DateTime.now().month; //Default Case
    q.m = q.month.toString();
  }

  if(q.day != null)
  {
    q.d = q.day.toString();
  }
  else
  {
    q.day = new DateTime.now().day; //Default case
    q.d = q.day.toString();
  }

  //Build Sensor and Device Variables
  if(q.tempInF && q.device == "e00fce681c2671fc7b1680eb")
  {
    q.sensor = "tempF";
  }
  else if(q.device == "e00fce681c2671fc7b1680eb")
  {
    q.sensor = "tempC";
  }
  else if(q.humidityInT && q.device == "e00fce686522d2441e1f693f")
  {
    q.sensor = "HumidityT";
  }
  else if(q.device == "e00fce686522d2441e1f693f")
  {
    q.sensor = "HumidityL";
  }
  else
  {
    q.device = "e00fce681c2671fc7b1680eb"; //Default Case
    q.sensor = "tempF";
  }

  //Build the path with all the class variables
  String buildPath = 'http://108.211.45.253:60005/find/'+ q.y +'/'+ q.m +'/'+ q.d + '?deviceID=' + q.device + '&sensor=' + q.sensor;

  print(buildPath);
  //Collects specific day result info
  return buildPath;
}//END MAKEPATH


/*
Future<DataResults> fetchResults() async
{
  //Collects Current Day Info
  int y = new DateTime.now().year;
  String year = y.toString();
  int m = new DateTime.now().month;
  String month = m.toString();
  int d = new DateTime.now().day;
  String day = d.toString();

  //Collects specific day result info
  String path= 'http://108.211.45.253:60005/find/'+ year +'/'+ month +'/'+ day + '?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF';
  print(path);
  final responseResults = await http.get(path);

  //Checks to see if the server sent an "OK" response
  if(responseResults.statusCode == 200)
  {
    //Data.results
    return DataResults.fromJson(json.decode(responseResults.body));
  }
  //Throws an exception if the server did NOT send an "OK" response
  else
  {
    throw Exception('Failed to Download Data');
  }
}//END FETCHRESULTS CLASS*/

//routeHome that provides http fetch functionality as well as bottom navigation
  class _MyAppState extends State<MyApp>

class MyLogoWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
  var assetsImage = new AssetImage('assets/2.0x/logo.png');
  var image = new Image(image: assetsImage, width:48.0, height: 48.0);
  return new Container(child: image);

  }
  }


  class routeHome extends StatelessWidget
  {

    //bottom navigation variables
    //int _currentIndex = 0;
    //final List<Widget> _children = [];

    double temp;
    String tempStr;
    String path = makePath();
    List<DataResults> list = List();
    var isLoading = false;

      _fetchRequest() async {
        setState(() {
          isLoading = true;
        });
        final response =
        await http.get(path);
        if (response.statusCode == 200) {
          list = (json.decode(response.body) as List)
            .map((data) => new DataResults.fromJson(data))
            .toList();

          setState(()
          {
            isLoading = false;
          });
        } else {
          throw Exception('Failed to Download Data');
        }
        for (int i = 0; i < list.length; i++)
          {
             temp = list[i].value;
            list[i].valueStr = temp.toString();
          }
      }//End fetchRequest

    //http fetch function stuff
    /*Future<DataResults> results;
    @override
    void initState()
    {
      super.initState();
      results = fetchResults();
    }*/

    @override
    Widget build(BuildContext context)
    {
      return MaterialApp(
        title: 'Sensors',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
          appBar: AppBar(
              title: Text('Sensor Home Page'),
            ),

            bottomNavigationBar: Padding(
            padding: const EdgeInsets.all(8.0),
                child: RaisedButton(
                  child: new Text("Fetch Data"),
                  onPressed: _fetchRequest,
                ),
              ),

            body: isLoading
                ? Center(
              child: CircularProgressIndicator(),
            )
                : ListView.builder(
                itemCount: list.length,
                itemBuilder: (BuildContext context, int index)
                {
                  tempStr = 'Time: ' + list[index].gatheredAt;
                  return ListTile(
                    contentPadding: EdgeInsets.all(10.0),
                    title: new Text(tempStr),
                    trailing: new Text(
                      list[index].valueStr,
                    ),
                  );
                }
                ),
        )
          //body: _children[_currentIndex],
          /*body: Center( //Create the fetch Request
            child: FutureBuilder<DataResults>(
              future: results,
              builder: (context, snapshot)
              {
                if (snapshot.hasData)
                {
                  print('TEST');
                  return Text(snapshot.data.value); //Why won't it let me post data twice???
                }
                else if (snapshot.hasError)
                {
                  return Text("${snapshot.error}");
                }

                return CircularProgressIndicator(); //Defaults to a circular loading indicator
              },
            ),
          ),
          bottomNavigationBar: BottomNavigationBar( //Creates Navigation Bar
            //onTap: onTabTapped,
            currentIndex: 0,
            items: [
              BottomNavigationBarItem( //Navigation Bar 1
                icon: new Icon(Icons.home),
                title: new Text('Home'),
              ),
              BottomNavigationBarItem( //Navigation Bar 2
                icon: new Icon(Icons.settings),
                title: new Text('Settings'),
              )
            ]
            ),*/
          );
    }
  } //end routeHome class



/*
  class PlaceholderWidget extents StatelessWidget
  {
    final Color color;

    PlaceholderWidget(this.color);

    @override
    Widget build(BuildContext context)
    {
      return Container(
        color: color,
      );
    }
  }
  void onTabTapped(int index)
  {
    setState(()
    {
      _currentIndex = index;
    });
  }
*/
  /* PREVIOUS ROUTE CODE - POSSIBLY DELETE???
  class routeTest2 extends StatelessWidget
  {
    @override
    Widget build(BuildContext context)
    {
      return Scaffold(
        appBar: AppBar(
          title: Text("Next Route"),
        ),
        body: Center(
          child: RaisedButton(
            onPressed: () {
              //NAVIGATION BACK
              Navigator.pop(context);
            },
          child: Text('Goin Back?'),
            ),
          ),
        );
    }
  }*/

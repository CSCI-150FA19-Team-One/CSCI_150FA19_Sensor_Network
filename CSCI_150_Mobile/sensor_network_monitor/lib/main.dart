import 'dart:async';
import 'dart:convert';
//import 'package:sensor_network_monitor/widgets_test.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
//import 'splash_screen_one.dart';
//import 'package:intl/intl.dart';

//Create global query class variable q
query q = new query();

//runs the program
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  static const String _title = 'Sensor Node';
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xff606060),
        //primarySwatch: Colors.blueGrey,
      ),
      debugShowCheckedModeBanner: false,
      home: SplashScreenOne(),
      //home: MyStatefulWidget(),
    );
  }
}

class SplashScreenOne extends StatefulWidget {

  @override
  _SplashScreenOneState createState() => _SplashScreenOneState();

}

class _SplashScreenOneState extends State<SplashScreenOne> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 3),() {
      Navigator.push(
        context,
          MaterialPageRoute(
            builder: (context) => MyStatefulWidget(),

          ));

    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              gradient: LinearGradient(
                  colors: [Colors.grey, Colors.black],
                  begin: Alignment.centerRight,
                  end: new Alignment(-1.0, -1.0)
              ),
            ),
          ),

          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              CircleAvatar(
                backgroundColor: Colors.black54,
                radius: 100.0,
                child: Icon(
                  Icons.polymer,
                  color: Colors.white,
                  size: 100.0,
                ),

              ),
              Padding(
                padding: EdgeInsets.only(top: 10.0),
              ),
              Text(
                'Sensor Node',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 38.0
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key}) : super(key: key);

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {

  //Create asynchronous auth and authreg variables
  Future<authReg> authreg;
  Future<Auth> auth;

  //Create initial state for the authreg and reg variables
  @override
  void initState()
  {
    super.initState();
    authreg = regRequest();
    auth = loginRequest();
  }

  int _currentIndex = 0;
   static const TextStyle optionStyle = TextStyle(
      fontSize: 30, fontWeight: FontWeight.bold);
   static const List<Widget> _widgetOptions = <Widget>[
    Text(

      'Welcome',
      style: TextStyle(
      color: Colors.white,
      fontSize: 38.0),
  //optionStyle,

    ),
    Text(
      'Temperature',
      style: TextStyle(
          color: Colors.white,
          fontSize: 38.0),
    ),
    Text(
      'Humidity',
      style: TextStyle(
          color: Colors.white,
          fontSize: 38.0),
    ),
    Text(
      'Ground Moisture',
      style: TextStyle(
          color: Colors.white,
          fontSize: 38.0),
    ),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(

        title: new Center(child: new Text('Sensor Node', textAlign: TextAlign.center)),
        backgroundColor: Color(0xff202020),
        automaticallyImplyLeading: false,

      ),
      body: Center(
        child: _widgetOptions.elementAt(_currentIndex),

      ),
      bottomNavigationBar: BottomNavigationBar(

        //},
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            backgroundColor: Color(0xff202020),
            icon: Icon(Icons.home),
            title: Text('Home'), // First Button
          ),
          BottomNavigationBarItem(
            backgroundColor: Color(0xff202020),
            icon: Icon(Icons.cloud_queue), //Second Button
            title: Text('Temperature'),
          ),
          BottomNavigationBarItem(
            backgroundColor: Color(0xff202020),
            icon: Icon(Icons.invert_colors), // Third Button
            title: Text('Humidity'),
          ),
          BottomNavigationBarItem(
            backgroundColor: Color(0xff202020),
            icon: Icon(Icons.local_florist), // Fourth Button
            title: Text('Ground Moisture'),
          ),
        ],
        currentIndex: _currentIndex,
        //backgroundColor: Colors.blue[800],
        unselectedItemColor: Colors.teal,
        selectedItemColor: Colors.white,
        onTap: _onItemTapped,
      ),

    );
  }
}

//Collects auth token Registration information
class authReg
{
  final String id;
  final String username;
  final String password;
  final String message;

  authReg._({this.id, this.username, this.password, this.message});

  factory authReg.fromJson(Map<String, dynamic> json)
  {
    return new authReg._(
      id: json['id'],
      username: json['username'],
      password: json['password'],
      message: json['message'],
    );
  }
}//END AuthReg CLASS

class Auth
{
  final String token;
  final String message;

  Auth._({this.token, this.message});

  factory Auth.fromJson(Map<String, dynamic> json)
  {
    return new Auth._(
      token: json['token'],
      message: json['token'],
    );
  }
}//END Auth CLASS

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

//Asynchronous approach to send a post request to the server to register the device
Future<authReg> regRequest() async
{
  //Create Request
  var response = await
  http.post(regURL(),
    //Create Body Login Info
    body: {'username': 'user333', 'password': '1234',}
  );
  print(response.body); //Check console for response Sent
  print(response.statusCode); //If status is 500: "Internal Server Error"

  if (response.statusCode == 200)
  {
    return authReg.fromJson(json.decode(response.body));
  }
  else
  {
    throw Exception('Failed to Download Data');
  }
}

//Asynchronous post request to receive a token from the server
Future<Auth> loginRequest() async
{
  //Create Request
  var response = await
  http.post(loginURL(),
      //Create Body Login Info
      body: {'username': 'user333', 'password': '1234',}
  );
  print(response.body); //Check console for response Sent
  print(response.statusCode); //If status is 500: "Internal Server Error"

  if (response.statusCode == 200)
  {
    return Auth.fromJson(json.decode(response.body));
  }
  else
  {
    throw Exception('Failed to Download Data');
  }
}

//Creates the authorization path
String regURL()
{
  return 'http://108.211.45.253:60005/user/register';
}

//Creates the login path for the token
String loginURL()
{
  return 'http://108.211.45.253:60005/user/login';
}
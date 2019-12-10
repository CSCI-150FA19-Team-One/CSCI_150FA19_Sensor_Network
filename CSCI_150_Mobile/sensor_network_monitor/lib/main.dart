import 'dart:async';
import 'dart:convert';
import 'dart:io';
//import 'package:sensor_network_monitor/widgets_test.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:sensor_network_monitor/Constants.dart';
import 'package:sensor_network_monitor/Profile.dart';
import 'package:sensor_network_monitor/login_screen.dart';
import 'package:sensor_network_monitor/notification_screen.dart';
import 'package:sensor_network_monitor/settings_page.dart';
//import 'splash_screen_one.dart';
//import 'package:intl/intl.dart';
//import 'package:url_launcher/url_launcher.dart';
//import './Profile.dart';

//Create global query class variable q
query q = new query();

//runs the program
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  static const String _title = 'Sensor Node';
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: _title,
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xff606060),
        //primarySwatch: Colors.blueGrey,
      ),

      debugShowCheckedModeBanner: false,
      home: SplashScreenOne(),
      routes: <String, WidgetBuilder>{
        "/a": (BuildContext) => new profilePage("new page"),
        "/b": (BuildContext) => new notificationScreen("new page"),
        "/c": (BuildContext) => new settingsPage("new page"),
        "/d": (BuildContext) => new loginPage("new page"),


  });
      //home: MyStatefulWidget());
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

  String mainProfilePicture = 'https://unsplash.com/photos/TdVGcGkb6C8';
  String secondProfilePicture = 'http://www.solidbackgrounds.com/2880x1800-spanish-sky-blue-solid-color-background.html';
  String thirdProfilePicture = 'http://www.solidbackgrounds.com/1920x1080-yellow-green-solid-color-background.html';
  String tempStr;
  String tempVal;
  //Create asynchronous auth and authreg variables
  Future<authReg> authreg;
  Future<Auth> auth;



  void switchUser() {
    String backupString = mainProfilePicture;
    this.setState(() {
      mainProfilePicture = secondProfilePicture;
      secondProfilePicture = thirdProfilePicture;
      thirdProfilePicture = backupString;
    });
  }
  //Create initial state for the authreg and reg variables
  @override
  void initState()
  {
    super.initState();
    authreg = regRequest();
    auth = loginRequest();
  }

  List<DataResults> list = List();
  _dataResults() async
  {
    //Create token string
    String token = "\"" + q.token + "\"";

    //POST request & response collection
    final response = await http.get(makePath(),
        //Create token header
        headers: {HttpHeaders.authorizationHeader: q.token},
    );

    list.length = 0;
    if (response.statusCode == 200)
    {
      list = (json.decode(response.body) as List)
      .map((data) => new DataResults.fromJson(data))
      .toList();
    }
    else
    {
      throw Exception('Failed to Download Data');
    }
  }

 int _currentIndex = 0;
   static const TextStyle optionStyle = TextStyle(
      fontSize: 30, fontWeight: FontWeight.bold);
   List<Widget> _widgetOptions = <Widget>[
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
      'Moisture',
      style: TextStyle(
          color: Colors.white,
          fontSize: 38.0),
    ),
  ];


  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
      print(index);
      if (index == 1)
        {
          q.device = "e00fce681c2671fc7b1680eb";
          q.sensor = "tempF";
          _dataResults();
        }
      else if (index == 2)
        {
          q.device = "e00fce686522d2441e1f693f";
          q.sensor = "HumidityL";
          _dataResults();
        }
      else if (index == 3)
        {
          q.device = "e00fce68b1b49ccf2e314c17";
          q.sensor = "GMoistureP";
          _dataResults();
        }
      else
        {} //Empty Else
      //String device=null; //"e00fce681c2671fc7b1680eb", "e00fce686522d2441e1f693f", "e00fce68b1b49ccf2e314c17"
      //String sensor=null; //"tempC", "tempF", "HumidityL", "HumidityT"
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      drawer: new Drawer(


        child: new ListView(


          children: <Widget>[
            new UserAccountsDrawerHeader(

              accountName: new Text(
                'Jose Baca',
                style: TextStyle(
                    color: Colors.black
                ),
              ),
              accountEmail: new Text(
                'stud@hotmail.com',
                style: TextStyle(
                    color: Colors.black
                ),
              ),
              currentAccountPicture: new GestureDetector(
                onTap: () => print('This is the current user'),
                child: new CircleAvatar(
                  backgroundColor: Colors.purple,
                  child: new Text("J"),
                 // backgroundImage: new NetworkImage(mainProfilePicture),
                ),
              ),
              otherAccountsPictures: <Widget>[
                new GestureDetector(

                  onTap: () => switchUser(),
                  child: new CircleAvatar(
                    backgroundColor: Colors.red,
                   child: new Text("G"),
                   // backgroundImage:new NetworkImage(secondProfilePicture) ,
                  ),
                ),
                new GestureDetector(
                  onTap: () => switchUser(),
                  child: new CircleAvatar(
                    backgroundColor: Colors.green,
                    child: new Text("R"),
                    //backgroundImage:new NetworkImage(thirdProfilePicture) ,
                  ),
                ),
              ],

              decoration:new BoxDecoration(
                  image: new DecorationImage(
                    fit: BoxFit.fill,
                    image: new NetworkImage(mainProfilePicture),
                  )
              ),
            ) ,

            new ListTile(
              title: new Text('Profile'),
              trailing: new Icon(Icons.person),
              onTap:() => Navigator.of(context).pushNamed("/a"),
            ),
            new ListTile(
              title: new Text('Notifications'),
              trailing: new Icon(Icons.notifications),
              onTap:() => Navigator.of(context).pushNamed("/b"),
             /* onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new profilePage("Notifications")));
              },

              */
            ),
            new ListTile(
              title: new Text('Settings'),
              trailing: new Icon(Icons.settings),
                onTap:() => Navigator.of(context).pushNamed("/c")
              /*onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new profilePage("Profile")));
              },

               */
            ),
            new ListTile(
              title: new Text('Logoff'),
              trailing: new Icon(Icons.lock),
                onTap:() => Navigator.of(context).pushNamed("/d")
            ),
            new Divider(),


            new ListTile(
              title: new Text('Close'),
              trailing: new Icon(Icons.close),
              onTap: () => Navigator.of(context).pop(),
            ),
          ],
        ),
      ),
          appBar: new AppBar(



            leading: Builder(
              builder: (context) => IconButton(
                icon: new Icon(Icons.view_headline),
                onPressed: () => Scaffold.of(context).openDrawer(),
              ),
            ),

            title: new Center(child: new Text("Sensor Node", textAlign: TextAlign.center)),
            //title: new Padding(child: new Text('Sensor Node'),
             //padding: const EdgeInsets.only(left: 75.0)),
             backgroundColor: Color(0xff202020),
             automaticallyImplyLeading: false,
            actions: <Widget>[
              PopupMenuButton<String>(
                onSelected: choiceAction,
                itemBuilder: (BuildContext context){
                  return Constants.choices.map((String choice){
                    return PopupMenuItem<String>(
                      value: choice,
                      child: Text(choice),
                    );
                  }).toList();
                },
              )
            ],



        ),


          body: Center(
            child: ListView.builder(
              //child:_widgetOptions.elementAt(_currentIndex),


              itemCount: list.length,
             itemBuilder: (BuildContext context, int index)
             {
             tempStr = 'Time: ' + list[index].gatheredAt;
             if (q.sensor=="tempC"||q.sensor=="tempF")
             {
              tempVal = "Temp: " + list[index].value.toStringAsFixed(4);
              }
              else
              {
                tempVal = "Value: " + list[index].value.toStringAsFixed(4);
              }
              return ListTile(
               contentPadding: EdgeInsets.all(10.0),
               title: new Text(tempStr),
                trailing: new Text(
                tempVal,
              ),
            );
          }
          ),

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
  void choiceAction(String choice){
    if(choice == Constants.NodeOne){
      print('Node One');
    }else if(choice == Constants.NodeTwo){
      print('Node Two');
    }else if(choice == Constants.NodeThree){
      print('Node Three');
    }else if(choice == Constants.NodeFour){
      print('Node Four');
    }

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
    q.token = json['token'];
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
  String token;


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
  http.post("http://108.211.45.253:60005/user/register",
    headers: {"Content-type": "application/json"},
    //Create Body Login Info
    body: '{"username": "onlyonce", "password": "1234"}'
  );

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
  http.post("http://108.211.45.253:60005/user/login",
      headers: {"Content-type": "application/json"},
      //Create Body Login Info
      body: '{"username": "onlyonce", "password": "1234"}'
  );
  print(response.body); //Check console for response Sent

  if (response.statusCode == 200)
  {
    return Auth.fromJson(json.decode(response.body));
  }
  else
  {
    throw Exception('Failed to Download Data');
  }
}
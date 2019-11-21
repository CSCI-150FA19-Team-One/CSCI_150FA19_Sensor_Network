import 'dart:async';
import 'dart:convert';
//import 'package:sensor_network_monitor/widgets_test.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

//http post request class
/*
class Post
{
  final int userID;
  final int id;
  final String title;
  final String body;

  Post({this.userID, this.id, this.title, this.body});

  factory Post.fromJson(Map<String, dynamic> json)
  {
    return Post(
      userID: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
} //end post class

//http fetchpost request class
Future<Post> fetchPost() async
{
  final response =
  //Collect http info
  await http.get('https://jsonplaceholder.typicode.com/posts/1');

  //Checks to see if the server sent an "OK" response
  if(response.statusCode == 200)
  {
    return Post.fromJson(json.decode(response.body));
  }
  //Throws an exception if the server did NOT send an "OK" response
  else
  {
    throw Exception('Failed to Download Data');
  }
} //end fetchPost class
*/
//Preparing for sensor data request

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
} //end post clas

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
      value: json['value'],
    );
  }
} //end post clas

/*
Future<Data> fetchData() async
{
  final response =
  //Collect http info
  await http.get('http://108.211.45.253:60005/find?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF');

  //Checks to see if the server sent an "OK" response
  if(response.statusCode == 200)
  {
    return Data.fromJson(json.decode(response.body[1]));
  }
  //Throws an exception if the server did NOT send an "OK" response
  else
  {
    throw Exception('Failed to Download Data');
  }
}*/

Future<DataResults> fetchResults() async
{
  //Collects Current Day Info
  int y = new DateTime.now().year;
  String year = y.toString();
  int m = new DateTime.now().month;
  String month = m.toString();
  int d = new DateTime.now().day;
  String day = d.toString();

  //Collect http info
  final response =
  await http.get('http://108.211.45.253:60005/find?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF');

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
}

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

//Creates the dynamic http path for the data of a specific day (current day only right now)
String makePath()
{
  //Collects Current Day Info
  int y = new DateTime.now().year;
  String year = y.toString();
  int m = new DateTime.now().month;
  String month = m.toString();
  int d = new DateTime.now().day;
  String day = d.toString();

  String temp = 'http://108.211.45.253:60005/find/'+ year +'/'+ month +'/'+ day + '?deviceID=e00fce681c2671fc7b1680eb&sensor=tempF';

  //Collects specific day result info
  return temp;
}

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

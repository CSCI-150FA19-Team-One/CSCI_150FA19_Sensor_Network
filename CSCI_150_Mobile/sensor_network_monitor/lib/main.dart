import 'dart:async';
import 'dart:convert';
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

//main form of the app. Also calls routeHome class
class MyApp extends StatefulWidget {

  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}
  /*
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    //my first edit
    return MaterialApp(
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
        home: routeHome(), //Goes to main home page
      //home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
} //end of MyApp class

//Unused, Demo class
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

//Unused, Demo class
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
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
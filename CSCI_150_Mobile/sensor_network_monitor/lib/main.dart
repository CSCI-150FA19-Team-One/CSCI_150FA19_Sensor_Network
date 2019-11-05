//import 'package:sensor_network_monitor/widgets_test.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

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
    int _currentIndex = 0;
    final List<Widget> _children = [];
    @override
    Widget build(BuildContext context)
    {
      return Scaffold(
        appBar: AppBar(
            title: Text('Sensor Home Page'),
          ),
        //body: _children[_currentIndex],
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
          ),
        );
    }
  }
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

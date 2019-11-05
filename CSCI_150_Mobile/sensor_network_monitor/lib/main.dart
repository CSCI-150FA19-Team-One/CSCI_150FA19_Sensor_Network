//import 'package:sensor_network_monitor/widgets_test.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    //my first edit
    return MaterialApp(
      title: 'Sensor Node',
      theme: ThemeData(
        primarySwatch: Colors.black,
      ),
      home: MyHomePage(title: 'Sensor Node'),
    );
  }
}

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



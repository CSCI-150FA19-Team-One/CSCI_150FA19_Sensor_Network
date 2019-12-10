import 'package:flutter/material.dart';


class settingsPage extends StatelessWidget
{

  final String title;

  settingsPage(this.title);

  @override
  Widget build(BuildContext context){
    return new Scaffold(
      appBar: new AppBar(
        leading: Builder(
          builder: (context) => IconButton(
              icon: new Icon(Icons.arrow_back),
              onPressed: () {
                Navigator.pop(context);
              }
          ),
        ),
        title: new Center(child: new Text("Settings", textAlign: TextAlign.center)),
        //title: new Padding(child: new Text('Settings'),
          //  padding: const EdgeInsets.only(left: 90.0)),
        backgroundColor: Color(0xff202020),
        automaticallyImplyLeading: false,

        //title: new Text("new page"),
      ),
      body: new Center(
        child:  new Text(
            "",
              style: TextStyle(
              color: Colors.white,
              fontSize: 25.0),
        ),
      ),

    );
  }

}
import 'package:flutter/material.dart';


class notificationScreen extends StatelessWidget {

  final String title;

  notificationScreen(this.title);

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
        title: new Center(child: new Text("Notifications", textAlign: TextAlign.center)),
        //title: new Padding(child: new Text('Notifications'),
           // padding: const EdgeInsets.only(left: 75.0)),
        backgroundColor: Color(0xff202020),
        automaticallyImplyLeading: false,

        //title: new Text("new page"),
      ),
      body: new Center(
        child:  new Text(
            "left on read",
            style: TextStyle(
            color: Colors.white,
            fontSize: 25.0),
      ),
      ),

    );
  }

}

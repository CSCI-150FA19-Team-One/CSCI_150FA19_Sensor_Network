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
        title: new Padding(child: new Text('Notifications'),
            padding: const EdgeInsets.only(left: 80.0)),
        backgroundColor: Color(0xff202020),
        automaticallyImplyLeading: false,

        //title: new Text("new page"),
      ),
      body: new Center(
        child:  new Text("new page"),
      ),

    );
  }

}

import 'package:flutter/material.dart';


class profilePage extends StatelessWidget {

  final String title;

  profilePage(this.title);

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
        title: new Center(child: new Text("Profile", textAlign: TextAlign.center)),
        //title: new Padding(child: new Text('Profile'),
          //  padding: const EdgeInsets.only(left: 100.0)),
        backgroundColor: Color(0xff202020),
        automaticallyImplyLeading: false,

        //title: new Text("new page"),
      ),
      body: new Center(
        child:  new Text(
            "you look good",
              style: TextStyle(
              color: Colors.white,
              fontSize: 25.0),
        ),
      ),

    );
  }

}



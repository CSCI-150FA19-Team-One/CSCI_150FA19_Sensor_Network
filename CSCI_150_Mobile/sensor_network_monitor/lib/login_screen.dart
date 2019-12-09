import 'package:flutter/material.dart';


class loginPage extends StatelessWidget {

  final String title;

  loginPage(this.title);

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
        title: new Center(child: new Text("Login", textAlign: TextAlign.center)),
        //title: new Padding(child: new Text('Login'),
          //  padding: const EdgeInsets.only(left: 110.0)),
        backgroundColor: Color(0xff202020),
        automaticallyImplyLeading: false,

      ),
      body: new Center(
        child:  new Text(
            "",
              style: TextStyle(
              color: Colors.white,
              fontSize: 38.0),),
      ),

    );
  }

}
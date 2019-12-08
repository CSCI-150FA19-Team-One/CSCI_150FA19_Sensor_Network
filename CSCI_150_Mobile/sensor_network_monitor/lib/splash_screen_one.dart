

/*class SplashScreenOne extends StatefulWidget {
  @override
  _SplashScreenOneState createState() => _SplashScreenOneState();

}

class _SplashScreenOneState extends State<SplashScreenOne> {
  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 5),()=> print('MyStatefulWidget'));
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
                backgroundColor: Colors.white,
                radius: 75.0,
                  child: Icon(
                    Icons.nature,
                    color: Colors.green,
                    size: 50.0,
                  ),

              ),
              Padding(
                padding: EdgeInsets.only(top: 10.0),
              ),
              Text(
                'Sensor Node',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24.0
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
*/
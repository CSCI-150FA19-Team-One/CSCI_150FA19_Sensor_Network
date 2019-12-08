import 'package:flutter/material.dart';

class MyLogoWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var assetsImage = new AssetImage('assets/2.0x/logo.png');
    var image = new Image(image: assetsImage, width:48.0, height: 48.0);
    return new Container(child: image);

  }
}

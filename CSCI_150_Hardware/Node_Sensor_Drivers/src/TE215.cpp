
#include "TE215.h"

TE215::TE215(uint8_t analogPin) {
    _analogPin = analogPin;
}

//TE215 with digital pin constructor
TE215::TE215(uint8_t analogPin, uint8_t digitalPin) {
    _analogPin = analogPin;   
    _digitalPin = digitalPin;
    pinMode(_digitalPin,INPUT);
    _digitalFeature = true;
}


void TE215::tick(){
    _raw = analogRead(_analogPin);

    if(_digitalFeature){
        _wet = digitalRead(_digitalPin);
    }
}

bool TE215::isWet(){
    return _wet;
}

double TE215::getGMoisture(){
    _GMoisturePercentage = map(_raw, gLow, gHigh, 0, 100);
    return _GMoisturePercentage;
    //return _raw;
}


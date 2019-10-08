
// TE215 sensor class
#include "Particle.h"
class TE215 {
 public:

  TE215 (uint8_t analogRPin){
    _analogPin = analogRPin;
  }

  // if we want to use digital feature of sensor
  //TE215(uint8_t analogPin, uint8_t digitalPin);
  double getGMoisture();

 private:
  uint8_t _analogPin;
  uint8_t _digitalPin;
 
};

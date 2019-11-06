
// TE215 sensor class
#include "Particle.h"

//still trying to see if these are proper values
#define gLow 4096
#define gHigh 1400

class TE215 {
 public:

  TE215 (uint8_t analogRPin);
  // if we want to use digital feature of sensor
  TE215(uint8_t analogPin, uint8_t digitalPin);
  double getGMoisture();
  bool isWet();
  void tick();

 private:
  uint8_t _analogPin;
  uint8_t _digitalPin;
  bool    _digitalFeature = false;
  bool    _wet; //is the ground wet or not
  int32_t _raw;
  int32_t _GMoisturePercentage;
};

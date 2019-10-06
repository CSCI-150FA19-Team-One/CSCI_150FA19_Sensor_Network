/*
 * Project Node_Sensor_Drivers
 * Description: Driver code for sensors on each node
 * Author: Gilbert Barr
 * Date: 9/13/19
 */
#include "SHT15.h"

SHT15 sensor0_1(D1, D0);


void setup() {
  //add some wifi for later
  WiFi.setCredentials("MASTER_LAPTOP", "passwrd100");

  // register functions with cloud
  //Particle.function("cloud name",function)

  Particle.function("getTemp", modeControl);
}

void loop() {

}

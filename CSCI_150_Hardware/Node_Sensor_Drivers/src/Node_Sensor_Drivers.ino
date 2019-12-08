/*
 * Project Node_Sensor_Drivers
 * Description: Driver code for sensors on each node
 * Author: Gilbert Barr
 * Date: 9/13/19
 */


//#define MYDEBUG //debug code enable

#include "SHT15.h"
#include "TE215.h"

#define TickRate 10000

SHT15 sensor0_1(D1, D0);
TE215 sensor2(A1);

double tempF, tempC, humidityLinear, humidityTrue, GMoisturePercentage;

void setup() {

  //add some wifi for later if on Argon
  #if PLATFORM_ID == PLATFORM_ARGON
  WiFi.setCredentials("MASTER_LAPTOP", "passwrd100");
  WiFi.setCredentials("IEEE-THERMALTAK 4824", "3250eJ+9");
  WiFi.setCredentials("Super G", "passwrd100");
  #endif

  // register functions/variables with cloud
  // sensor0_1.cloudRegister();
  Particle.variable("TempF", tempF);
  Particle.variable("TempC", tempC);
  Particle.variable("HumidityL", humidityLinear);
  Particle.variable("HumidityT", humidityTrue);
  Particle.variable("GMoistureP", GMoisturePercentage);

#ifdef MYDEBUG
  // Debug Setup Code Start
  Serial.begin(9600);
  while(!Serial.isConnected()) Particle.process();
  Serial.println("Debug Begin");
  // Debug Setup Code End
#endif

}

void loop() {

  sensor0_1.Tick();
  tempF = sensor0_1.getTemperatureF();
  tempC = sensor0_1.getTemperatureC();
  humidityLinear = sensor0_1.getHumidityLinear();
  humidityTrue = sensor0_1.getHumidityTrue();
  sensor2.tick();
  GMoisturePercentage = sensor2.getGMoisture();

#ifdef MYDEBUG
  Serial.print("Variable tempF: ");
  Serial.print(tempF);
  Serial.print(" Variable tempC: ");
  Serial.println(tempC);
  sensor0_1.printVariables();
#endif

  delay(TickRate);
}

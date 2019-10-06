
#include "SHT15.h"

SHT15::SHT15(int dataPin, int clockPin) {
  _dataPin = dataPin;
  _clockPin = dataPin;
}

double SHT15::getTemperatureF() {
  _tempuratureF = ((double)_rawDataT * 0.018) -
                  39.4; // current temperature in degrees Fahrenheit
  return _tempuratureF;
}

//
double SHT15::getTemperatureC() {
  _tempuratureC =
      ((double)_rawDataT * 0.01) - 39.65; // current temperature in degrees C
  return _tempuratureC;
}

// get unprocessed Sensor reading from SHT
void SHT15::_readDataRaw(bool sensor) {
  // 0 = tempurature; 1 = humidity
  uint8_t cmd = sensor ? _getHumidityCmd : _getTempCmd;
  _sendCommandSHT(cmd);
  _waitForResultSHT();
  _getData16SHT(sensor);
  _skipCrcSHT();
}

// Start SHT Transmission sequence
// Then send Command byte
// then wait for sensor acknowledge
void SHT15::_sendCommandSHT(uint8_t cmd) {

  bool ACK;
  // Transmission Start sequence
  pinMode(_dataPin, OUTPUT);
  pinMode(_clockPin, OUTPUT);
  digitalWrite(_dataPin, HIGH);
  digitalWrite(_clockPin, HIGH);
  digitalWrite(_dataPin, LOW);
  digitalWrite(_clockPin, LOW);
  digitalWrite(_clockPin, HIGH);
  digitalWrite(_dataPin, HIGH);
  digitalWrite(_clockPin, LOW);

  // shift out 8 bit cmd
  shiftOut(_dataPin, _clockPin, MSBFIRST, cmd);

  // Verify we get the correct ack
  digitalWrite(_clockPin, HIGH);
  pinMode(_dataPin, INPUT);
  ACK = digitalRead(_dataPin);
  if (ACK != LOW) {
    // send error message
  }
  digitalWrite(_clockPin, LOW);
  ACK = digitalRead(_dataPin);
  if (ACK != HIGH) {
    // send error message here too
  }
}

// poll data pin for SHT to begin data Transmission
void SHT15::_waitForResultSHT() {

  int ACK;
  pinMode(_dataPin, INPUT);
  // poll data pin for sensor to pull low
  for (uint8_t i = 0; i < 100; i++) {
    delay(10);
    ACK = digitalRead(_dataPin);
    if (ACK == LOW) {
      break;
    }
  }

  if (ACK == HIGH) {
    // error out here
  }
}

// recives SHT data while sending acknowledge signals
void SHT15::_getData16SHT(bool sensor) {
  // 0 = tempurature; 1 = humidity
  uint16_t *_rawData = sensor ? &_rawDataH : &_rawDataT;
  // get the MSB
  pinMode(_dataPin, INPUT);
  pinMode(_clockPin, OUTPUT);
  *_rawData = _dataShiftIn(8);
  *_rawData << 8; // shift msb over for later

  // send ACK
  pinMode(_dataPin, OUTPUT);
  digitalWrite(_dataPin, HIGH);
  digitalWrite(_dataPin, LOW);
  digitalWrite(_clockPin, HIGH);
  digitalWrite(_clockPin, LOW);

  // get the LSB and OR it
  pinMode(_dataPin, INPUT);
  *_rawData |= _dataShiftIn(8);
}

// ends SHT Transmission without sending CRC
void SHT15::_skipCrcSHT() {
  // Skip acknowledge to end trans (no CRC)
  pinMode(_dataPin, OUTPUT);
  pinMode(_clockPin, OUTPUT);

  digitalWrite(_dataPin, HIGH);
  digitalWrite(_clockPin, HIGH);
  digitalWrite(_clockPin, LOW);
}

// custom shiftin fucntion for SHT
uint32_t SHT15::_dataShiftIn(uint8_t numBits) {
  uint32_t bitval = 0;

  for (uint8_t i = 0; i < numBits; i++) {
    digitalWrite(_clockPin, HIGH);
    delay(10);
    // shift over bitval while ANDing new reading
    bitval = (bitval << 1) + digitalRead(_dataPin);
    digitalWrite(_clockPin, LOW);
  }

  return (bitval);
}

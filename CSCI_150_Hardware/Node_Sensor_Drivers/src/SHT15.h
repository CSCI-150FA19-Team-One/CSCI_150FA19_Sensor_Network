
#include "Sensor.h"
//SHT15 sensor file

class SHT15 : public Sensor{
    public:
    
    SHT15(uint8_t dataPin, uint8_t clockPin);
    double   getTemperatureF();
    double   getTemperatureC();

    private:

    uint8_t  _clockPin;
    uint8_t  _dataPin;
    double   _rawData;
    double   _tempuratureF;
    double   _tempuratureC;
    uint8_t  _getTempCmd = 0b00000011;
    uint8_t  _getHumidityCmd = 0b00000101;
    void     _readDataRaw();
    void     _sendCommandSHT(uint8_t cmd);
    void     _waitForResultSHT();
    uint16_t _getData16SHT();
    void     _skipCrcSHT();
    uint32_t _dataShiftIn(uint8_t numBits);
    
};


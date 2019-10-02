
#include "SHT15.h"

SHT15::SHT15(uint8_t dataPin, uint8_t clockPin){
    _dataPin = dataPin;
    _clockPin = dataPin;
}


void SHT15::_readDataRaw(){

    _sendCommandSHT();//fix me
    _waitForResultSHT();
    _rawData = _getData16SHT();
    _skipCrcSHT();

}

void SHT15::_sendCommandSHT(uint8_t cmd){};
void SHT15::_waitForResultSHT(){};
uint16_t SHT15::_getData16SHT(){};
void SHT15::_skipCrcSHT(){};
uint32_t SHT15::_dataShiftIn(uint8_t numBits){};
#pragma once

#include "ofMain.h"
#include "ofxJSON.h"
#include "ofxOsc.h"

#define HOST "localhost"
#define PORT 98765

#define W 1280
#define H 720

class ofApp: public ofBaseApp
{
public:
    void setup();
    void draw();
    void update();
    void callData(std::string url);

    std::vector<float> posXB;
    std::vector<float> posYB;
    std::vector<float> posZB;
    std::vector<float> levelPerC;
    std::vector<std::string> name;
    std::vector<std::string> category;
    std::vector<std::string> lastUpdate;
    std::vector<std::string> code;
    std::vector<std::string> sub;

    ofTrueTypeFont font;
    ofTrueTypeFont font1;
    ofTrueTypeFont font2;

    string bloque = " --- AGUA --- ";
    int dias = 5870;
    int horas = 23;
    int minutos = 35;
    int segundos = 12;

    ofSoundPlayer drop;

    ofxJSONElement json;
    std::size_t numData;

    float tempX;
    float tempY;
    float temp;

    float time = 0;
    float time1 = 0;
    bool scheduler = false;
    bool drawnText = false;

    ofxOscSender sender;
    std::vector<float> LRAeqH;

    int color = 0;
    int count = 0;
};

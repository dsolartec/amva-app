#include "ofApp.h"

void ofApp::setup()
{
    ofEnableAlphaBlending();

    drop.load("gota.wav");

    // OSC

    sender.setup(HOST, PORT);

    // JSON

    // Caudal
    // callData("http://siata.gov.co:8089/estacionesNivel/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");
    //Ruido
    callData("http://siata.gov.co:8089/estacionesRuidoAmbientalHorario/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    // Graphic

    ofBackground(0);
    ofSetFrameRate(60);

    font.load("SaucerBB.ttf",9);
    font1.load("SaucerBB.ttf",14);
    font2.load("f.ttf",36);
}

void ofApp::update()
{
    float currentTime = ofGetElapsedTimeMillis();
    float currentTime1 = ofGetElapsedTimeMillis();

    // if(currentTime - time >= 50){
    if(currentTime - time >= ofRandom(200) + 200){
        time = currentTime;
        temp = ofRandom(numData);
        drop.setSpeed(levelPerC[temp]);
        drop.play();
        if(count < LRAeqH.size()){
          ofxOscMessage m;
          m.setAddress("/noise/level");
          m.addFloatArg(ofMap(LRAeqH[count],0,100,50,200));
          sender.sendMessage(m);
          color = ofMap(LRAeqH[count],0,100,0,255);
          count++;
        } else {
           count = 0;
        }
    }
    if(currentTime1 - time1 >= 1000){
        time1 = currentTime1;
        if(segundos > 1){
          segundos--;
        } else if (segundos == 1){
          segundos = 60;
          minutos--;
        }
    }
}

void ofApp::draw()
{
//     ofBackground(color);
//     int s = LRAeqH.size();
//     float r = ofRandom(s);
//     int index = (int)r;
// 
//     ofSetColor(0);
//     font2.drawString(ofToString(LRAeqH[index]),135,H/2);
//     font2.drawString(ofToString(LRAeqH[index]),W-135,H/2);
//     font2.drawString(ofToString(LRAeqH[index]),W/2,135);
//     font2.drawString(ofToString(LRAeqH[index]),W/2,H-135);

    /*font2.drawString(ofToString(name[temp]),35,H/2);
    font2.drawString(ofToString(levelPerC[temp]),35,H/2 + 35);
    font2.drawString(ofToString(posXB[temp]),W-105,H/2);
    font2.drawString(ofToString(posXB[temp]),W-105,H/2 + 35);*/

    font2.drawString(bloque,35,H/3);
    font2.drawString("Dias "+ofToString(dias)+
    "\nHoras "+ofToString(horas)+
    " "+ofToString(minutos)+" "+ofToString(segundos),35,H/3+200);

    /*ofSetColor(255);
    //ofDrawBitmapString("Access granted: Red de estaciones de nivel del SIATA en el area metropolitana Medellin.", 35,35);
    font1.drawString("DATA",35,35);
    font.drawString("Access granted: Red de estaciones de nivel del SIATA en el area metropolitana Medellin", 35,75);
    font.drawString("Data URL: http://siata.gov.co:8089/estacionesNivel/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/", 35,H-35);
    font1.drawString("Medellin",35,H-135);
    font.drawString(">>> DATA ...",35,H-100);

    ofTranslate(W/2, H/2);

    for (int i = 0; i < numData; i++)
    {
        tempX = ofMap(posXB[i],-0.12,0.3,-W/2,W/2);
        tempY = ofMap(posYB[i],-0.4,0.4,-H/2,H/2);

        if(i == (int)temp){
            ofSetColor(255);
            std::string text = lastUpdate[i] + "\n" + name[i] + "\n" + category[i] +"\n"+ code[i] +"\n"+ sub[i];
            //ofDrawBitmapString(text,W/2 - 460, -H/2 + 35);
            font.drawString(text,W/2 - 460, -H/2 + 35);
            ofDrawLine(tempX + levelPerC[i] + 2, tempY, tempX + 30, tempY);
            //ofDrawBitmapString(name[i],tempX + levelPerC[i] + 30,tempY+ levelPerC[i]);
            font.drawString(name[i],tempX + levelPerC[i] + 30,tempY+ levelPerC[i]);
            ofNoFill();
            ofDrawCircle(tempX,tempY,levelPerC[i]+2);
        }
        ofFill();
        ofSetColor(ofMap(levelPerC[i],0,12,0,255));
        ofDrawCircle(tempX,tempY,levelPerC[i]);
    }*/
}

void ofApp::callData(std::string url)
{
    bool parsingSuccessful = json.open(url);

    if (parsingSuccessful)
    {
        ofLogNotice("ofApp::setup") << "Access granted: Red de estaciones de nivel del SIATA en el área metropolitana Medellín.";
    } else {
        ofLogNotice("ofApp::setup") << "Failed to parse JSON.";
    }

    numData = json["datos"].size();
    int tempSize = json["datos"][0]["datos"].size();

    LRAeqH.resize(numData * tempSize);

    // ofLogNotice() << json["datos"][0]["datos"];
    //ofLogNotice() << json["datos"][0]["datos"][0]["LRAeqH"];
    for (Json::ArrayIndex i = 0; i < numData; i++)
    {
      for (Json::ArrayIndex j = 0; j < tempSize; j++)
      {
          Json::ArrayIndex t = j + tempSize * i;
          float tempValue = json["datos"][i]["datos"][j]["LRAeqH"].asFloat();
          if(tempValue > 0){
              LRAeqH[t] = tempValue;
          } else {
              LRAeqH[t] = 0.0f;
          }
      }
    }

    // Caudal

    posXB.resize(numData);
    posYB.resize(numData);
    posZB.resize(numData);
    levelPerC.resize(numData);
    name.resize(numData);
    category.resize(numData);
    lastUpdate.resize(numData);
    code.resize(numData);
    sub.resize(numData);


    for (Json::ArrayIndex i = 0; i < numData; i++)
    {
        posXB[i] = json["datos"][i]["coordenadas"][0]["longitud"].asFloat() + 75.5658;
        posYB[i] = json["datos"][i]["coordenadas"][0]["latitud"].asFloat() - 6.2476;
        posZB[i] = 0.0;
        float temp = json["datos"][i]["porcentajeNivel"].asFloat();
        levelPerC[i] = (temp > 0) ? (temp / 7.0) : 1;
        name[i] = json["datos"][i]["nombre"].asString();
        category[i] = json["datos"][i]["categoria"].asString();
        lastUpdate[i] = json["datos"][i]["ultimaActualizacion"].asString();
        code[i] = json["datos"][i]["codigo"].asString();
        sub[i] = json["datos"][i]["subCuenca"].asString();
    }
}

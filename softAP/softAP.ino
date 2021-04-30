#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "EEPROM.h"
#include <WiFiUdp.h>;
#include <HTTPClient.h>;
#include <OSCMessage.h>;
AsyncWebServer server(80);
char *ssid = "myEsp";
char *password = "testpassword";
const char HTML[] PROGMEM = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Wifi Credentials Input</title>\n</head>\n<body>\n    <form action=\"/\" method=\"POST\" >\n    <fieldset>\n        <label for=\"ssid\">Wifi Network Name</label>\n        <input type=\"text\" name=\"ssid\" id=\"ssid\" value=\"...\">\n        <label for=\"pw\">Wifi Password</label>\n        <input type=\"text\" name=\"pw\" id=\"pw\" value=\"...\">\n    </fieldset>\n    <fieldset>\n        <input type=\"submit\" value=\"submit\">\n    </fieldset>\n    </form>\n</body>\n</html>";
int prevWifiStatus = 6;
const String serialNumber = "1976";

const String endpoint = "https://api.theinput.tk/devices/find?id=" + serialNumber;

String oscAddress = "/blank_address";

int sensorValue = 0;
int sensorPin = 5; //
IPAddress outIp(159, 203, 191, 234); //public ip of the computer running max
const unsigned int outPort = 57121;
WiFiUDP Udp;
String s;
String p;
void setup() {
  Serial.begin(115200);
  EEPROM.begin(400);
  s = EEPROM.readString(100);
  Serial.println(s);
  p = EEPROM.readString(200);
  Serial.println(p);
  if (s.length() > 1 && p.length() > 1) {
    WiFi.begin(s.c_str(), p.c_str());
  } else {
    startSoftAP();
  }
  
}

void startSoftAP() {
  WiFi.softAP(ssid, password);
  
  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());
  WiFi.mode(WIFI_AP_STA);


  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", HTML);
  });
  server.begin();
  
  server.on("/", HTTP_POST, [](AsyncWebServerRequest *request){
    Serial.print(request->getParam(0)->name());
    Serial.println(":");
    Serial.println(request->getParam(0)->value());
    Serial.print(request->getParam(1)->name());
    Serial.println(":");
    Serial.println(request->getParam(1)->value());
    String Wifissid = request->getParam(0)->value().c_str();
    String Wifipassword= request->getParam(1)->value().c_str();
    Udp.begin(outPort);
    char ssidBuff[30];
    char pwBuff[30];
    Wifissid.toCharArray(ssidBuff, 30);
    Wifipassword.toCharArray(pwBuff, 30);
    EEPROM.writeString(100, ssidBuff);
    EEPROM.writeString(200, pwBuff);
    EEPROM.commit();
    request->send(200, "text/html", HTML);
    ESP.restart();
  });
}

void reportWifiConnection() {
  if (WiFi.status() != prevWifiStatus) {
    Serial.println("connected to wifi");
    assignAddress();
  }
  prevWifiStatus = WiFi.status();
}

void assignAddress() {
  HTTPClient http;
 
    http.begin(endpoint);
    Serial.println(endpoint);//Specify the URL
    int httpCode = http.GET();  //Make the request
 
    if (httpCode > 0) { //Check for the returning code
 
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);
        oscAddress = "/" + payload;
        Serial.println(oscAddress);
      }
 
    else {
      Serial.println("Error on HTTP request");
    }
 
    http.end(); //Free the resources
}

void loop(){
    sensorValue = digitalRead(sensorPin);
    sensorValue++;
    OSCMessage msg(oscAddress.c_str());
    msg.add(sensorValue);
    Udp.beginPacket(outIp, outPort);
    msg.send(Udp); // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    msg.empty(); // free space occupied by message
    delay(2);

}

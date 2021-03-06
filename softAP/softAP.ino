#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WiFiUdp.h>;
#include <OSCMessage.h>;
AsyncWebServer server(80);
char *ssid = "myEsp";
char *password = "testpassword";
const char HTML[] PROGMEM = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Wifi Credentials Input</title>\n</head>\n<body>\n    <form action=\"/\" method=\"POST\" >\n    <fieldset>\n        <label for=\"ssid\">Wifi Network Name</label>\n        <input type=\"text\" name=\"ssid\" id=\"ssid\" value=\"...\">\n        <label for=\"pw\">Wifi Password</label>\n        <input type=\"text\" name=\"pw\" id=\"pw\" value=\"...\">\n    </fieldset>\n    <fieldset>\n        <input type=\"submit\" value=\"submit\">\n    </fieldset>\n    </form>\n</body>\n</html>";
int prevWifiStatus = 6;

int sensorValue = 0;
int sensorPin = 5; //
IPAddress outIp(159, 203, 191, 234); //public ip of the computer running max
const unsigned int outPort = 57121;
WiFiUDP Udp;

void setup() {
  Serial.begin(115200);
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
    const char *Wifissid = request->getParam(0)->value().c_str();
    const char *Wifipassword= request->getParam(1)->value().c_str();
    Udp.begin(outPort);
    WiFi.begin(Wifissid , Wifipassword );
    request->send(200, "text/html", HTML);
  });
}

void reportWifiConnection() {
  if (WiFi.status() != prevWifiStatus) Serial.println("connected to wifi");
  prevWifiStatus = WiFi.status();
}

void loop(){
    reportWifiConnection();
    sensorValue = digitalRead(sensorPin);
    sensorValue++;
    OSCMessage msg("/test_via_softap1");
    msg.add(sensorValue);
    Udp.beginPacket(outIp, outPort);
    msg.send(Udp); // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    msg.empty(); // free space occupied by message
    delay(2);

}

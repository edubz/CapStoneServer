#include "WiFi.h"
#include <WiFiUdp.h>  
#include <OSCMessage.h>

const char * ssid = "wifi_ssid";
const char * password = "wifi-pass";

int sensorValue = 0;
int sensorPin = 36; //

IPAddress outIp(98, 246, 240, 250); //public ip of the computer running max
const unsigned int outPort = 9999;
WiFiUDP Udp;

void setup(){
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    Udp.begin(outPort);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop(){

    sensorValue = analogRead(sensorPin);
    
//    Serial.print("sensor = ");
//    Serial.print(sensorValue);
    OSCMessage msg("/sensor");
    msg.add(sensorValue);
    Udp.beginPacket(outIp, outPort);
    msg.send(Udp); // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    msg.empty(); // free space occupied by message
    delay(2);

}

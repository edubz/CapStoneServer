#include "WiFi.h"
#include <WiFiUdp.h>  
#include <OSCMessage.h>

const char * ssid = "*******";
const char * password = "******";

int sensorValue = 0;
int sensorPin = 36; //

IPAddress outIp(159, 203, 191, 234); //public ip of the server
const unsigned int outPort = 57121;
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
    
    Serial.print("sensor = ");
    Serial.println(sensorValue);
    OSCMessage msg("/koalaFlex");
    msg.add(sensorValue);
    Udp.beginPacket(outIp, outPort);
    msg.send(Udp); // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    msg.empty(); // free space occupied by message
    delay(2);

}

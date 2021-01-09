#include "WiFi.h"
#include <WiFiUdp.h>  
#include <OSCMessage.h>

const char * ssid = "wall_of_static";
const char * password = "cyfermastertm";



IPAddress outIp(192, 168, 1, 140);
const unsigned int outPort = 9999;
WiFiUDP Udp;

void setup(){
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    Udp.begin(outPort);
    WiFi.begin(ssid, password);
    if (WiFi.waitForConnectResult() != WL_CONNECTED) {
        Serial.println("WiFi Failed");
        while(1) {
            delay(1000);
        }
    }
}

void loop(){

    OSCMessage msg("/sensor");
    msg.add(666);
    Udp.beginPacket(outIp, outPort);
    msg.send(Udp); // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    msg.empty(); // free space occupied by message

}

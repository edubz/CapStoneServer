#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WebSocketsClient.h>;
#include <SocketIOclient.h>;
#include <Preferences.h>
#include <WiFiUdp.h>;
#include <HTTPClient.h>;
#include <OSCMessage.h>;
#include <ArduinoJson.h>

#define USE_SERIAL Serial

SocketIOclient socketIO;

char path[] = "/";
char uri[] = "ws://159.203.191.234:5000";

//preferences lib setup
Preferences preferences;
String Wifissid  = "";
String Wifipw = "";

//web server setup
AsyncWebServer server(80);
char *APssid = "theinput-config";
char *APpassword = "testpassword";
const char HTML[] PROGMEM = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Wifi Credentials Input</title>\n</head>\n<body>\n    <form action=\"/\" method=\"POST\" >\n    <fieldset>\n        <label for=\"ssid\">Wifi Network Name</label>\n        <input type=\"text\" name=\"ssid\" id=\"ssid\" value=\"...\">\n        <label for=\"pw\">Wifi Password</label>\n        <input type=\"text\" name=\"pw\" id=\"pw\" value=\"...\">\n    </fieldset>\n    <fieldset>\n        <input type=\"submit\" value=\"submit\">\n    </fieldset>\n    </form>\n</body>\n</html>";
const String serialNumber = "1976";

//sensor+osc setup
boolean onPublicWifi = false;
String oscAddress = "";
int sensorValue = 0;
int sensorPin = 5; //
IPAddress outIp(159, 203, 191, 234); //public ip of the computer running max
const unsigned int outPort = 57121;
WiFiUDP Udp;

boolean wifiCredentialsAreSaved() {
  //instantiate preferences class as read/write 
  preferences.begin("credentials", false);
  //attempt to load ssid and pw from preferences memory
  Wifissid = preferences.getString("ssid", "");
  Wifipw = preferences.getString("pw", "");
  Serial.println(Wifissid+" "+ Wifipw);
  
  if (Wifissid == "" && Wifipw == "") return false;
  else return true;
}

void event(const char * payload, size_t length) {
  Serial.println(payload);
};

void connectToWifi() {
  Serial.println(Wifissid.c_str());
  //begin wifi connection and prepare for osc connection
  Serial.print("Connecting to " + Wifissid);
  while (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(Wifissid.c_str(), Wifipw.c_str());
    Serial.print(".");
    delay(1000);
  }
  Serial.println("");
  Serial.println("Connected!");
  assignAddress();
  delay(500);
  onPublicWifi = true;
  Udp.begin(outPort);
}

void setup() {
  Serial.begin(115200);
  if (wifiCredentialsAreSaved()) connectToWifi();
  else startSoftAP();

  socketIO.begin("https://api.theinput.tk", 443, "/socket.io/?EIO=4");
  socketIO.onEvent(socketIOEvent);

  String buddyAddr = "/buddy_flag"; 
  OSCMessage msg(buddyAddr.c_str());
  msg.add("1");
  Udp.beginPacket(outIp, outPort);
  msg.send(Udp); // send the bytes to the SLIP stream
  Udp.endPacket(); // mark the end of the OSC Packet
  msg.empty(); // free space occupied by message
  delay(2);

  
}

void loop(){
  socketIO.loop();
  String data;
    if (onPublicWifi) handleOSC();
//    if (client.connected()) {
//      webSocketClient.getData(data);
//      if (data.length() > 0) {
//        Serial.println(data);
//      }
//    }
}


void startSoftAP() {
  Serial.println("no credentials saved. connect to 'theinput-config' network and visit 192.168.4.1");
  
  //instantiate a self-hosted internet access point that user can connect to
  WiFi.softAP(APssid, APpassword);
  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());
  WiFi.mode(WIFI_AP_STA);

  //start an asynchronous web server on the access point network
  server.begin();

  //when users connect to the server send a web form
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", HTML);
  });

  //when users submit their wifi ssid and pw from the web form, 
  //save them into memory using preferences and restart the device
  server.on("/", HTTP_POST, [](AsyncWebServerRequest *request){
    String ssidFromAP = request->getParam(0)->value().c_str();
    String passwordFromAP = request->getParam(1)->value().c_str();
    preferences.putString("ssid", ssidFromAP);
    preferences.putString("pw", passwordFromAP);
    request->send(200, "text/plain", "Wifi Credentials saved. Device Restarting.");
    ESP.restart();
  });
}

void assignAddress() {
  HTTPClient http;
  //a url that when requested checks the database for
  //a device with a matching serial number
  const String endpoint = "https://api.theinput.tk/devices/find?id=" + serialNumber;
  //begin an http request to the input API
  http.begin(endpoint);
  int httpCode = http.GET();
 
  if (httpCode > 0) { //Check for the returning code
        String payload = http.getString();
        Serial.println(httpCode); //check for errors
        Serial.println(payload);
        //set the osc address to the name of the retrieved 
        //device so it can be easily identified
        oscAddress = "/" + payload;
        Serial.println(oscAddress);
      }
 
    else {
      Serial.println("Error on HTTP request");
    }
 
    http.end(); //Free the resources
}

void handleOSC() {
  sensorValue = digitalRead(sensorPin);
  OSCMessage msg(oscAddress.c_str());
  msg.add(sensorValue);
  Udp.beginPacket(outIp, outPort);
  msg.send(Udp); // send the bytes to the SLIP stream
  Udp.endPacket(); // mark the end of the OSC Packet
  msg.empty(); // free space occupied by message
  delay(2);
}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
        {
            char * sptr = NULL;
            int id = strtol((char *)payload, &sptr, 10);
            USE_SERIAL.printf("[IOc] get event: %s id: %d\n", payload, id);
            if(id) {
                payload = (uint8_t *)sptr;
            }
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            if(error) {
                USE_SERIAL.print(F("deserializeJson() failed: "));
                USE_SERIAL.println(error.c_str());
                return;
            }

            String eventName = doc[0];
            USE_SERIAL.printf("[IOc] event name: %s\n", eventName.c_str());

            // Message Includes a ID for a ACK (callback)
            if(id) {
                // creat JSON message for Socket.IO (ack)
                DynamicJsonDocument docOut(1024);
                JsonArray array = docOut.to<JsonArray>();

                // add payload (parameters) for the ack (callback function)
                JsonObject param1 = array.createNestedObject();
                param1["now"] = millis();

                // JSON to String (serializion)
                String output;
                output += id;
                serializeJson(docOut, output);

                // Send event
                socketIO.send(sIOtype_ACK, output);
            }
        }
            break;
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            break;
    }
}

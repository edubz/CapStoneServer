//declare express and start server instance
const express = require('express');
var app = express();
var server = require('http').Server(app);


var http = require('http').Server(app);
var port = process.env.PORT || 3000;

//declare and start socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
	console.log('new connection at ' + socket.id);
  	socket.on('report', function (val) {
    // console.log(socket.id + ':' + val);
  });
});


//declare and start osc UDP
var osc = require("osc");

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
    // For most Ports, send() should only be called after the "ready" event fires.
    io.on('connection', function(socket){
      socket.on('report', function(val){
        udpPort.send({
          address: "/",
          args: [
              {
                  type: "f",
                  value: val
              }
            ]
        });
        io.emit('val', val);
    });
  });
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

//declare and start midi io
const midi = require ('midi');
const input = new midi.Input();
input.getPortCount();
input.getPortName(0);
 
// Configure a callback.
input.on('message', (deltaTime, message) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  console.log(`m: ${message} d: ${deltaTime}`);
  udpPort.send({
          address: "/",
          args: [
              {
                  type: "m",
                  value: message
              }
            ]
        });
});
input.openPort(0);
 
// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);
// Close the port when done.
setTimeout(function() {
  input.closePort();
}, 100000);


const output = new midi.Output();
output.getPortCount();
output.getPortName(0);
output.openPort(0);
output.sendMessage([176,22,1]);
output.closePort();

//audio file upload from p5js
const multer  = require('multer') 
const upload = multer();  
const fs = require('fs'); 
app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
   //console.log(req.file); // see what got uploaded

  let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname // where to save the file to. make sure the incoming name has a .wav extension

  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok

});


app.use(express.static('public'));

app.get('/maxinterface', function (req, res)  {
  res.sendFile(__dirname + '/public/maxinterface.html');
});

server.listen(3000);




// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user:capstone@pcc-creative-coding-capstone-3cnck.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err, client) => {
//   if (err) console.log('failed to connect')
//   else {
//     console.log('connected');
//   }
// });

//   app.listen(port, function(){
//   console.log('listening on *:' + port);
// });












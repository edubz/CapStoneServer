//declare express and start server instance
const express = require('express');
var app = express();
var server = require('http').Server(app);

/*

//experimenting with https funtionality

const https = require('https');

https.get('https://localhost:3000', 
  res => {
    console.log(res.statusCode);
    console.log(res.headers);
  }
)

var staticAlias = require("node-static-alias");

*/
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

//declare and start socket.io
var io = require('socket.io')(server);
var maxio = io.of('/maxio');

//declare and start osc UDP
var osc = require("osc");

var getIPAddresses = function() {
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

udpPort.on("ready", function() {
  var ipAddresses = getIPAddresses();
  ipAddresses.forEach(function(address) {
    console.log(" Host:", address + ", Port:", udpPort.options.localPort);
  });
  // For most Ports, send() should only be called after the "ready" event fires.
  io.on('connection', function(socket) {
    socket.on('report', function(val) {
      udpPort.send({
        address: "/oscmessages",
        args: [{
          type: "f",
          value: val
        }]
      });
      maxio.emit('val', val);
    });
  });
});

udpPort.on("message", function(oscMessage) {
  console.log(oscMessage);
});

udpPort.on("error", function(err) {
  console.log(err);
});

udpPort.open();

//declare and start midi io
const midi = require('midi');
const input = new midi.Input();
var midiStarted=false;
setInterval(function(){
  if (input.getPortCount()>0 && midiStarted == false){
    midiStarted = true;
    console.log('new ports');
    input.openPort(0);
  }
}, 2000);

console.log(input.getPortCount());
input.on('message', (deltaTime, message) => {
  console.log(message);
  maxio.emit('midi', message);
  udpPort.send({
    address: "/midiarray",
    args: [{
      type: "m",
      value: message
    }]
  });
});

input.ignoreTypes(false, false, false);

//audio file upload from p5js
const multer = require('multer')
const upload = multer();
const fs = require('fs');
var uploadNum;
app.post('/upload', upload.single('soundBlob'), function(req, res, next) {
  //console.log(req.file); // see what got uploaded
  let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname // where to save the file to. make sure the incoming name has a .wav extension

  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok
  fileArray();
  maxio.emit('length', files);
  if (uploadNum < 5) {
    uploadNum += 1;
  } else {
    uploadNum = 0;
  }
  console.log(files.length)
  io.emit('num', uploadNum);
});


var files = new Array;

function fileArray() {
  const dir = __dirname + '/public/uploads';
  var i = 0;
  fs.readdirSync(dir).forEach(function(file) {
    if (file != 'spaceholderfile.txt' && file != '.DS_Store') {
      i++;
      files[i] = file;
    }
  });
  if (files.length < 1) {
    uploadNum = 0;
  }
  files.splice(0, 1);
  maxio.on('connection', function() {
    maxio.emit('files', files);
  });
};
fileArray();

app.use(express.static('public'));

app.get('/maxinterface', function(req, res) {
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
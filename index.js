//declare express and start server instance
const express = require('express');
var app = express();
var server = require('http').Server(app);


var http = require('http').Server(app);
var port = process.env.PORT || 3000;

//declare and start socket.io
var io = require('socket.io')(server);
var maxio = io.of('/maxio');

const maxApi = require('max-api');
maxApi.post('hello max');

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

  maxApi.post("Listening for OSC over UDP.");
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
  maxApi.outlet(oscMessage);
});

udpPort.on("error", function(err) {
  console.log(err);
});

udpPort.open();

//declare and start midi io
const midi = require('midi');
const input = new midi.Input();
input.getPortCount();
input.getPortName(0);

// Configure a callback.
input.on('message', (deltaTime, message) => {
  maxio.emit('midi', message);
  udpPort.send({
    address: "/midiarray",
    args: [{
      type: "m",
      value: message
    }]
  });
  maxApi.outlet(message);
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


const output = new midi.Output();
output.getPortCount();
output.getPortName(0);
output.openPort(0);
output.sendMessage([176, 22, 1]);
output.closePort();
//   if (dirent.isFile && dirent.name !='.DS_Store' && dirent.name!='spaceholderfile.txt')
//   files[i] = dirent;
// }


// var stat = fs.statSync(__dirname + '/public/uploads/audiofile10.wav');
// var stream = ss.createStream();
// var readableStream = fs.createReadStream(__dirname + '/public/uploads/audiofile10.wav');
// readableStream.pipe(stream);    
// }

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
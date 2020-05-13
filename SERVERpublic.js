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
  io.on('connection', function(socket) {
    socket.on('report', function(val) {
      udpPort.send({
        address: "/oscmessages",
        args: [{
          type: "f",
          value: val
        }]
      });
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
    input.openPort(0);
  }
}, 2000);

console.log(input.getPortCount());
input.on('message', (deltaTime, message) => {
  console.log(message);
  udpPort.send({
    address: "/midiarray",
    args: [{
      type: "m",
      value: message
    }]
  });
});
input.ignoreTypes(false, false, false);


const output = new midi.Output();
output.getPortCount();
output.getPortName(0);
output.openPort(0);
output.sendMessage([176, 22, 1]);
output.closePort();

//audio file upload from p5js
const aws = require('aws-sdk');
const multer = require('multer');
const multer_s3 = require('multer-s3');

aws.config.loadFromPath('./credentials.json');

const s3 = new aws.S3();
var uploadNum;
const upload = multer({
  storage: multer_s3({
    s3: s3,
    bucket: 'capstone-audio-files',
    metadata: function (req, file, cb) {
      cb(null, {fieldname: file.originalname.toString()});
    },
    key: function(req,file,cb){
      cb(null, file.originalname.toString() );
    },
  })
});

const fs = require('fs');
var uploadSingle = upload.single('soundBlob');
app.post('/upload', function(req, res) {
  uploadSingle(req, res, (err) => {
    console.log(req.file.key);
  });
  fileArray();
  if (uploadNum < 5) {
    uploadNum += 1;
  } else {
    uploadNum = 0;
  }
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
};
fileArray();


app.use(express.static('public'));

/*
//set header content type / cross origin access
res.set("Content-Type", "text/html");
res.append(" Access-Control-Allow_Origin:",  " * ");
*/

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
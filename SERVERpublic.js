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



// var udpPort = new osc.UDPPort({
//   localAddress: "0.0.0.0",
//   localPort: 57121
// });

// udpPort.on("ready", function() {
//   var ipAddresses = getIPAddresses();
//   ipAddresses.forEach(function(address) {
//     console.log(" Host:", address + ", Port:", udpPort.options.localPort);
//   });
//   io.on('connection', function(socket) {
//     socket.on('report', function(val) {
//       udpPort.send({
//         address: "/oscmessages",
//         args: [{
//           type: "f",
//           value: val
//         }]
//       });
//     });
//   });
// });

// udpPort.on("message", function(oscMessage) {
//   console.log(oscMessage);
// });

// udpPort.on("error", function(err) {
//   console.log(err);
// });

// udpPort.open();

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
var params = {
  Bucket: 'capstone-control-data',
  Key: '',
  Body: ''
}
io.on('connection', (socket) => { 
  socket.on('report1', (data) => {
    params.Key = 's1vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s1.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report2', (data) => {
    params.Key = 's2vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s2.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report3', (data) => {
    params.Key = 's3vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s3.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report4', (data) => {
    params.Key = 's4vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s4.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report5', (data) => {
    params.Key = 's5vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s5.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report6', (data) => {
    params.Key = 's6vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s6.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report7', (data) => {
    params.Key = 's7vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s7.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report8', (data) => {
    params.Key = 's8vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s8.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report9', (data) => {
    params.Key = 's9vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s9.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report10', (data) => {
    params.Key = 's10vals';
    params.Body = data.toString();
    var bits = new Array;
    bits = data;
    var file = fs.createWriteStream('./reference-control-vals/s10.txt');
    file.write(bits.join(', ') + '\n');
    file.end();
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  })
})


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
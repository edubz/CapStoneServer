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


io.on('connection', (socket) => { 
  socket.on('report1', (data) => {
    let params1 = {
      Bucket: 'capstone-control-data',
      Key: 's1vals',
      Body: data.toString()
    }
    params1.Body = data.toString();
    s3.upload(params1, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report2', (data) => {
    let params2 = {
      Bucket: 'capstone-control-data',
      Key: 's2vals',
      Body: data.toString()
    }
    s3.upload(params2, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report3', (data) => {
    let params3 = {
      Bucket: 'capstone-control-data',
      Key: 's3vals',
      Body: data.toString()
    }    
    s3.upload(params3, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report4', (data) => {
    let params4 = {
      Bucket: 'capstone-control-data',
      Key: 's4vals',
      Body: data.toString()
    }
    s3.upload(params4, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report5', (data) => {
    let params5 = {
      Bucket: 'capstone-control-data',
      Key: 's5vals',
      Body: data.toString()
    }
    s3.upload(params5, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report6', (data) => {
    let params6 = {
      Bucket: 'capstone-control-data',
      Key: 's6vals',
      Body: data.toString()
    }
    s3.upload(params6, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report7', (data) => {
    let params7 = {
      Bucket: 'capstone-control-data',
      Key: 's7vals',
      Body: data.toString()
    }
    s3.upload(params7, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report8', (data) => {
    let params8 = {
      Bucket: 'capstone-control-data',
      Key: 's8vals',
      Body: data.toString()
    }
    s3.upload(params8, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report9', (data) => {
    let params9 = {
      Bucket: 'capstone-control-data',
      Key: 's9vals',
      Body: data.toString()
    }
    s3.upload(params9, (err, data) => {
      if (err) console.log(err);
    });
  })

  socket.on('report10', (data) => {
    let params10 = {
      Bucket: 'capstone-control-data',
      Key: 's10vals',
      Body: data.toString()
    }
    s3.upload(params10, (err, data) => {
      if (err) console.log(err);
    });
  })
})

var Particle = require('particle-api-js');
var particle = new Particle();
var token;

particle.login({username: 'thecapstoners2020@gmail.com', password: 'capstone2020'}).then(
  function(data) {
    //console.log(data.body.access_token)
    token = data.body.access_token;
    particle.getVariable({deviceId: '390037000e47373334323233' , name:"flex", auth: token})
    .then((data) => {
      console.log(data.body.result);
    })
    .catch((err) => {
      console.log(err)
    });

    //list();
    //getVars(data.body.access_token);
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);

// function list(){
//   var deviceList = particle.listDevices({ auth: token});

//   deviceList.then((devices) => {
//     console.log(devices);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }
// let accessToken;
// const credentials = {
//   client: {
//     id: 'urks-is-the-best-8360',
//     secret: '56a2caaf33a94b782f2f4d54e5b959e17cf760bd'
//   },
//   auth: {
//     tokenHost: 'https://api.particle.io/oauth/token'
//   }
// };

// async function run() {
//   const oauth2 = require('simple-oauth2').create(credentials);
 
//   const tokenConfig = {
//     username: 'thecapstoners2020@gmail.com',
//     password: 'capstone2020',
//   };
 
//   try {
//     const result = await oauth2.ownerPassword.getToken(tokenConfig);
//     const access = oauth2.accessToken.create(result);
//     accessToken = access.token.access_token;
//     getVars(accessToken);
//   } catch (error) {
//     console.log('Access Token Error', error.message);
//   }
// }

// console.log(accessToken);

function getVars(token){
  particle.getVariable({deviceId: 390037000e47373334323233 , name:"flex", auth: token})
    .then((data) => {
      console.log(data.body.result);
    })
    .catch((err) => {
      console.log(err)
    });
}



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
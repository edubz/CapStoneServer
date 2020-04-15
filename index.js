//declare express and start server instance
const express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static('public'));

server.listen(3000);

var http = require('http').Server(app);
var port = process.env.PORT || 3000;

//declare and start socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
	console.log('new connection at ' + socket.id);
  	socket.on('report', function (val) {
    console.log(socket.id + ':' + val);
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
    this.send({
        address: "/carrier/frequency",
        args: [
            {
                type: "f",
                value: 0
            }
        ]

	});
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

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












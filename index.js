const express = require("express");
const app = express();
const server = app.listen(3000);
var numSockets=0;

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connect', newConnection);
function newConnection(socket){
    console.log("New connection: " + socket.id);
}

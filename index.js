/*Server side code*/

"use strict";

//import express module
const express = require('express');

var app = express();

var server = require('http').Server(app);

app.use(express.static('public'));

//listen to server at http://localhost:3000/
server.listen(3000);

var http = require('http').Server(app);


var io = require('socket.io')(server);


//when a new socket is connected, call this function
io.on('connection', function (socket) {

	console.log('new connection at ' + socket.id);

	//next few lines of code - credit to * Daniel Schiffman *
	 // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

});


    
  	socket.on('report', function (val) {
    console.log(socket.id + ':' + val);
  });
});
function newConnection(socket){
console.log("connection" + socket.id);
}


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:capstone@pcc-creative-coding-capstone-3cnck.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, client) => {
  if (err) console.log('failed to connect')
  else {
    console.log('connected');
  }
});
*/
//   app.listen(port, function(){
//   console.log('listening on *:' + port);
// });












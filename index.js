const express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static('public'));

server.listen(3000);

var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(server);
io.on('connection', function (socket) {
	console.log('new connection at ' + socket.id);
  	socket.on('report', function (val) {
    console.log(socket.id + ':' + val);
  });
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:capstone@pcc-creative-coding-capstone-3cnck.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, client) => {
  if (err) console.log('failed to connect')
  else {
    console.log('connected');
  }
});

//   app.listen(port, function(){
//   console.log('listening on *:' + port);
// });












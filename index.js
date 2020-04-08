const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.use(express.static('public'));


app.listen(port, function(){
  console.log('listening on *:' + port);
});
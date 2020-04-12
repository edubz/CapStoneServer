const express = require('express');
var app = express();
app.use(express.static('public'));


var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:capstone@pcc-creative-coding-capstone-3cnck.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, client) => {
  if (err) console.log('failed to connect')
  else {
    console.log('connected')
  }
});

  app.listen(port, function(){
  console.log('listening on *:' + port);
});












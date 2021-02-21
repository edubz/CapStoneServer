const maxAPI = require('max-api');
const publicServerURL = 'https://capstone-public-server.herokuapp.com';

const AudioFiles = require('./AudioFiles.js');
AudioFiles.initialize(publicServerURL);

var ioClient = require('socket.io-client');
var socket = ioClient.connect(publicServerURL, {reconnect: true});
socket.on('connect', () => console.log('connected to public server with websockets'));

socket.on('file uploaded', (fileName) => {
  maxAPI.outlet(fileName);
});



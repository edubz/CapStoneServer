const maxAPI = require('max-api')
const publicServerUrl = "https://capstone-public-server.herokuapp.com"
const ioClient = require('socket.io-client');
const socket = ioClient.connect(publicServerUrl, {reconnect: true});
socket.on('connect', () => maxAPI.post("Connected to public server via web socket"))
socket.on('disconnect', () => maxAPI.post("Disconnected from web socket"))
socket.on('file uploaded', (fileName) => maxAPI.outlet(fileName));
const maxAPI = require('max-api')
const publicServerUrl = "http://159.203.191.234/"
const ioClient = require('socket.io-client');
const socket = ioClient.connect(publicServerUrl, {reconnect: true});
socket.on('connect', () => maxAPI.post("Connected to public server via web socket"))
socket.on('disconnect', () => maxAPI.post("Disconnected from web socket"))
socket.on('osc message', (messages) => {
	messages.forEach((message, index) => {
		maxAPI.outlet({"index":index, "message":message});
	});
});
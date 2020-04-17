var socket=io.connect('http://localhost:3000');

function setup() {
	createCanvas(innerWidth,innerHeight);
	socket.on('val', reportOSC);
}

function reportOSC(val) {
	background(255);
	textSize(72);
	text(val, 50, 50);
}
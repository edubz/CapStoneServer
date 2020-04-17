var socket=io.connect('http://localhost:3000');
var value,msg,num;

function setup() {
	createCanvas(innerWidth,innerHeight);
	socket.on('val', reportOSC);
	socket.on('midi', reportMidi);
	socket.on('sent', saveFiles);
	textSize(24);
	text("OSC Message", 200, 150);
	text('MIDI Message', 400, 150);
	text('none', 200, 200);
	text('none', 400, 200);
	// socket.on('sent', saveFiles);
}

function reportOSC(val) {
	value = val;
}

function reportMidi(message) {
	msg = message[0] + ',' + message[1] + "," + message[2];
}

function draw(){
	background(255);
	if (value){
	text("OSC Message", 200, 150);
	text('MIDI Message', 400, 150);
	text(value, 200, 200);
} else {
	text("OSC Message", 200, 150);
	text('MIDI Message', 400, 150);
	text('none', 200, 200);
}
	if (msg){
	text("OSC Message", 200, 150);
	text('MIDI Message', 400, 150);
	text(msg, 400, 200);
} else {
	text("OSC Message", 200, 150);
	text('MIDI Message', 400, 150);
	text('none', 400, 200);
}
}

	

function saveFiles(uploadNum){
	print(uploadNum);
}
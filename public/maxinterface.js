var socket = io('/maxio');
var value, msg, num;
var inc = 0;
var sounds = new Array;
var prevFiles = new Array;
var errorState = 1;

function preload() {
	socket.on('files', function(files) {
		for (var i = 0; i < files.length; i++) {
			prevFiles[i] = files[i];
			sounds[i] = loadSound('uploads/' + files[i]);
			errorState = 0;
			if (!sounds[0]) errorState = 1;
		}
	});
}


function setup() {
	createCanvas(innerWidth, innerHeight);
	socket.on('val', reportOSC);
	socket.on('midi', reportMidi);
	socket.on('length', appendFiles)
	textSize(24);
	text("OSC Message", 200, 150);
	text('MIDI Message', 400, 150);
	text('none', 200, 200);
	text('none', 400, 200);

}

function reportOSC(val) {
	value = val;
}

function reportMidi(message) {
	msg = message[0] + ',' + message[1] + "," + message[2];
}

function appendFiles(files) {
	if (files.length > prevFiles.length) {
		var newOne = loadSound('uploads/' + files[files.length - 1], function() {
			sounds.push(newOne);
		});
	}
	for (var i = 0; i < files.length; i++) {
		prevFiles[i] = files[i];
	}
}

function draw() {
	background(255);
	if (errorState == 1) {
		text('sound not working refresh until error disappears or record some sounds to populate the buffer', 20, 20);
	} else if (errorState == 0) {
		text('sound ready. click to start stream', 20, 20)
	} else if (errorState == 2) {
		text('no audio in buffer yet. record some at localhost:3000 and refresh', 20, 20)
	}
	if (value) {
		text("OSC Message", 200, 150);
		text('MIDI Message', 400, 150);
		text(value, 200, 200);
	} else {
		text("OSC Message", 200, 150);
		text('MIDI Message', 400, 150);
		text('none', 200, 200);
	}
	if (msg) {
		text("OSC Message", 200, 150);
		text('MIDI Message', 400, 150);
		text(msg, 400, 200);
	} else {
		text("OSC Message", 200, 150);
		text('MIDI Message', 400, 150);
		text('none', 400, 200);
	}
	if (sounds[inc]) {
		sounds[inc].onended(function() {
			if (inc < sounds.length - 1) {
				inc++;
				// print(inc);
			} else {
				inc = 0;
			}
			if (sounds[inc])
				print(sounds[inc]);
			sounds[inc].play();
		});
	}
}

function mousePressed() {
	sounds[inc].play();
}
var socket = io.connect('http://localhost:3000');
let mic, recorder, soundFile, soundElement, micPng;
var uploadNum2=-1;
var s1,s2,s3,s4,s5,s6,s7,s8,s9,s10;
var s1vals = [];
var s2vals = [];
var s3vals = [];
var s4vals = [];
var s5vals = [];
var s6vals = [];
var s7vals = [];
var s8vals = [];
var s9vals = [];
var s10vals = [];
let state = 0; // mousePress will increment from Record, to Stop, to Play
var i=0;


function setup() {
  canvas = createCanvas(400, 400);
  micPng = loadImage('microphone-png.png');
  
  image(micPng, 0, 0, micPng.width / 2, micPng.height / 2);
  canvas.text('Enable mic and click the mouse to begin recording', 20, 20);
  canvas.background(200);
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  soundElement = select('#soundElement');
  s1 = createSlider();
  s2 = createSlider();
  s3 = createSlider();
  s4 = createSlider();
  s5 = createSlider();
  s6 = createSlider();
  s7 = createSlider();
  s8 = createSlider();
  s9 = createSlider();
  s10 = createSlider();
  setInterval(s1Array,10);
  setInterval(s2Array,10);
  setInterval(s3Array,10);
  setInterval(s4Array,10);
  setInterval(s5Array,10);
  setInterval(s6Array,10);
  setInterval(s7Array,10);
  setInterval(s8Array,10);
  setInterval(s9Array,10);
  setInterval(s10Array,10);
  //canvas.mousePressed(mouse);
}

function s1Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s1Report(s1vals);
  }
  s1vals[i]=s1.value();
}

function s1Report(vals){
  socket.emit('report1', s1vals);
}

function s2Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s2Report(s2vals);
  }
  s2vals[i]=s2.value();
}

function s2Report(vals){
  socket.emit('report2', s2vals);
}

function s3Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s3Report(s3vals);
  }
  s3vals[i]=s3.value();
}

function s3Report(vals){
  socket.emit('report3', s3vals);
}

function s4Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s4Report(s4vals);
  }
  s4vals[i]=s4.value();
}

function s4Report(vals){
  socket.emit('report4', s4vals);
}
function s5Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s5Report(s5vals);
  }
  s5vals[i]=s5.value();
}

function s5Report(vals){
  socket.emit('report5', s5vals);
}

function s6Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s6Report(s6vals);
  }
  s6vals[i]=s6.value();
}

function s6Report(vals){
  socket.emit('report6', s6vals);
}

function s7Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s7Report(s7vals);
  }
  s7vals[i]=s7.value();
}

function s7Report(vals){
  socket.emit('report7', s7vals);
}

function s8Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s8Report(s8vals);
  }
  s8vals[i]=s8.value();
}

function s8Report(vals){
  socket.emit('report8', s8vals);
}

function s9Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s9Report(s9vals);
  }
  s9vals[i]=s9.value();
}

function s9Report(vals){
  socket.emit('report9', s9vals);
}

function s10Array() {
  if (i<50){
    i++;
  } else {
    i=0;
    s10Report(s10vals);
  }
  s10vals[i]=s10.value();
}

function s10Report(vals){
  socket.emit('report10', s10vals);
}

function mouse() {
  getAudioContext().resume();
  audioRecord();
}

function audioRecord() {
  canvas.background(200);
  image(micPng, 0, 0, micPng.width / 2, micPng.height / 2);
  canvas.text('Enable mic and click the mouse to begin recording', 20, 20);

  if (state === 0 && mic.enabled) {
    recorder.record(soundFile);
    canvas.background(255, 0, 0);
    image(micPng, 0, 0, micPng.width / 2, micPng.height / 2);
     
 
    canvas.text('Recording now! Click to stop.', 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop();

    canvas.background(0, 255, 0);
    image(micPng, 0, 0, micPng.width / 2, micPng.height / 2);
    canvas.text('Recording stopped. Click to play & save', 20, 20);
    state++;
  } else if (state === 2) { 
  if (uploadNum2<5){
      uploadNum2++;
    } else {
      uploadNum2=0;
    }
    var soundBlob = soundFile.getBlob();
    let formdata = new FormData();
    formdata.append('soundBlob', soundBlob, 'file' + uploadNum2 + '.wav');
    print(uploadNum2)
    let serverUrl = '/upload';
    let httpRequestOptions = {
      method: 'POST',
      body: formdata
    };

    httpDo(
      serverUrl,
      httpRequestOptions,
      (successStatusCode) => { //if we were successful...
        console.log("uploaded recording successfully: " + successStatusCode)
      },
      (error) => {
        console.error(error);
      }
    )
    soundFile.play();
    state = 0;
  }
}
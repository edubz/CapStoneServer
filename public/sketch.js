var socket = io.connect('http://localhost:3000');
let mic, recorder, soundFile, soundElement;
var uploadNum2 = 0;

let state = 0; // mousePress will increment from Record, to Stop, to Play


function setup() {
  canvas = createCanvas(400, 400);
  background(200);
  fill(0);
  text('Enable mic and click the mouse to begin recording', 20, 20);
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  soundElement = select('#soundElement');
  var slider = createSlider();
  slider.input(reportValue);
  socket.on('num', reportNum);
  canvas.mousePressed(mouse);
}

function reportValue() {
  var val = this.value();
  socket.emit('report', val);

}

function reportNum(uploadNum) {
  uploadNum2 = uploadNum;
}

function mouse() {
  getAudioContext().resume();
  audioRecord();

}

function audioRecord() {
  if (state === 0 && mic.enabled) {
    recorder.record(soundFile);
    canvas.background(255, 0, 0);
    canvas.text('Recording now! Click to stop.', 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop();

    canvas.background(0, 255, 0);
    canvas.text('Recording stopped. Click to play & save', 20, 20);
    state++;
  } else if (state === 2) {
    var soundBlob = soundFile.getBlob();
    let formdata = new FormData();
    formdata.append('soundBlob', soundBlob, 'file' + uploadNum2 + '.wav');
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
// var socket = io.connect("https://capstone-public-server.herokuapp.com/");
let mic, recorder, soundFile, soundElement;
let stateImg = [];
var uploadNum2 = -1;
let state = 0; // mousePress will increment from Record, to Stop, to Play
let prevState;
var i = 0;
var minReached = false;

function preload() {
  stateImg[0] = loadImage("/Assets/record.png");
  stateImg[1] = loadImage("/Assets/stop.png");
  stateImg[2] = loadImage("/Assets/play.png");
}

function setup() {
  canvas = createCanvas(300, 300);
  for (var i=0;i<3;i++){
    stateImg[i].resize(canvas.width+5,0);
  }
  image(stateImg[0], -3, -5);
  fill(255)
  textSize(14)
  canvas.text("Enable mic and click the button", 20, 275);
  canvas.text("above to begin recording ^^^", 20, 290);
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  soundElement = select("#soundElement");
  canvas.mousePressed(mouse);
  canvas.touchStarted(mouse);
}

function mouse() {
  getAudioContext().resume();
  if (state == prevState) {
    var minRecTime = setTimeout(() => { minReached = true }, 500);
    if (minReached == true) {
      clearTimeout(minRecTime);
      audioRecord();
      minReached = false;
    }
  } else {
    audioRecord();
  }
  prevState = state;
}

function audioRecord() {
  if (state === 0 && mic.enabled) {
    recorder.record(soundFile);
    canvas.clear();
    canvas.background(color(0,0,0,0));
    image(stateImg[1], -3, -5);
    canvas.text("Recording now! Click to stop.", 20, 285);
    state++;
  } else if (state === 1) {
    recorder.stop();
    canvas.clear();
    canvas.background(color(0,0,0,0));
    image(stateImg[2], -3, -5);
    canvas.text("Recording stopped. Click to play & save", 20, 285);
    state++;
  } else if (state === 2) {
    canvas.clear();
    canvas.background(color(0,0,0,0));
    image(stateImg[0], -3, -5);
    canvas.text("Enable mic and click the button", 20, 275);
    canvas.text("above to begin recording ^^^", 20, 290);
    if (uploadNum2 < 5) {
      uploadNum2++;
    } else {
      uploadNum2 = 0;
    }
    var soundBlob = soundFile.getBlob();
    let formdata = new FormData();
    formdata.append("soundBlob", soundBlob, "file" + uploadNum2 + ".wav");
    let serverUrl = "/upload";
    let httpRequestOptions = {
      method: "POST",
      body: formdata,
    };

    httpDo(
      serverUrl,
      httpRequestOptions,
      (successStatusCode) => {
        //if we were successful...
        console.log("uploaded recording successfully: " + successStatusCode);
      },
      (error) => {
        console.error(error);
      }
    );
    soundFile.play();
    state = 0;
  }
}

let mic, recorder, soundFile;
var uploadNum = -1;

function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight / 2);
  fill(255);
  textAlign(CENTER);
  textSize(30);
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  canvas.text("Hold Spacebar to Record", width / 2, height / 2);
}

function keyPressed() {
  getAudioContext().resume();
  if (keyCode === 32) {
    recorder.record(soundFile);
    canvas.clear();
    canvas.text("Recording now!", width / 2, height / 2);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    recorder.stop();
    soundFile.play();
    upload();
    canvas.clear();
    canvas.text("Hold Spacebar to Record", width / 2, height / 2);
  }
}

function upload() {
  if (uploadNum < 5) {
    uploadNum++;
  } else {
    uploadNum = 0;
  }

  var soundBlob = soundFile.getBlob();
  let formdata = new FormData();
  formdata.append("soundBlob", soundBlob, "file" + uploadNum + ".wav");
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
}
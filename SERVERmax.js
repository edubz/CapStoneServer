/*
This script checks an s3 bucket to see if an audio 
file has been uploaded in the last 10 seconds, and 
if so it downloads the file to disk. When a file is
finished downloading an osc message is sent to Max  
to load the file into a buffer for post-processing.
*/

//global state vairables
var i = 0;
var ranOnce = false;
var currDL;

//import function to compute difference of current time and upload time
const timediff = require('./get_time_diff.js')

//init osc comms on port 57121
var osc = require('osc');
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});

udpPort.open();

//aws and s3 init
var AWS = require("aws-sdk");
AWS.config.loadFromPath("./credentials.json");
const s3 = new AWS.S3();

//set up fs for stream
const fs = require("fs");
const Errors = require("errors");

//returns promise that checks metadata of each file and resolves when a file has been modified in the last 10 seconds
function checkS3Promise() {
  
  //iterate through files(variable i is incremented later once a file has been downloaded)
  if (i > 5) i = 0;
  var params = { Bucket: "capstone-audio-files", Key: "file" + i + ".wav" };
  
  //create a promise that will check metadata and resolve once a it finds a file that was created < 10 seconds ago 
  return new Promise((resolve, reject) => {
  
    //get metadata
    s3.headObject(params, (err, metadata) => {
  
      //handle errors
      if (err && ["NotFound", "Forbidden"].indexOf(err.code) > -1)
        return resolve();
      else if (err) {
        const e = Object.assign({}, Errors.SOMETHING_WRONG, { err });
        return reject(e);
      }
  
      //compare current time to last modified
      var lastModified = metadata.LastModified;
      if (timediff.get_time_diff(lastModified) < 10000) {
  
        //if modified less than 10 seconds ago save name of file being checked
        currDL = params;
  
        //resolve metadata promise to start another promise that handles downloading
        resolve(currDL);
      } else {
  
        //if the recently modified file has already been downloaded don't download again
        if (currDL && currDL.Key == params.Key) {
          ranOnce = false;
        }
  
        //check next file
        i++;
        checkS3();
      }
    });
  });
}

//returns promise that resolves once an object has been successfully downloaded from s3
function downloadS3Promise(params) {
  return new Promise((resolve, reject) => {
  
    //where to save the file to
    let uploadLocation = __dirname + "/App/public/uploads/" + params.Key;
  
    //create writeable file on disk at upload location and handle errors
    var file = fs.createWriteStream(uploadLocation).on("error",(err) => {
      console.log(err);
      reject();
    });
  
    //create readable stream from s3 file and handle errors
    var object = s3
      .getObject(params)
      .createReadStream()
      .on("error", (error) => {
        console.log("problem grabbing s3 data " + error);
        reject();
      });
  
    //pipe readstream to file
    object.pipe(file);
  
    //on finish resolve promise to start checking next file
    object.on("finish", () => {
      i++;
      resolve(params.Key);
    });
  });
}

function checkS3() {
  
  //if a file has been recently modified download it
  checkS3Promise()
    .then((currDL) => downloadS3(currDL))
    .catch((err) => console.log(err));
}
checkS3();

function downloadS3(params) {
  
  //if recently modified file has already been downloaded don't download again
  if (ranOnce == true) {
    checkS3();
  } else {
  
    //set already downloaded flag
    ranOnce = true;
  
    //when file is done downloading send osc message to max containing the name of the file
    downloadS3Promise(params)
      .then((data) => {
        console.log("s3download   " + data);
        udpPort.send(
          {
            address: "/s3",
            args: [
              {
                type: "s",
                value: data,
              },
            ],
          },
          "127.0.0.1",
          57110
        );
        checkS3();
      })
      .catch((err) => console.log(err));
  }
}

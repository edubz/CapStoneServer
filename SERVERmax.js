//init logging to file in case of machine crash
const log = require('simple-node-logger').createSimpleLogger('app.log');

//global state vairables
var i = 0;
var ranOnce = false;
var currDL;

//import function to compute difference between two js time objects
const timediff = require('./get_time_diff.js')

//setup fs for stream
const fs = require("fs");
const Errors = require("errors");

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

//retrieve metadata and resolve when a file has been modified in the last 10 seconds
function checkS3Promise() {
  
  //iterate through files
  if (i > 5) i = 0;
  var params = { Bucket: "capstone-audio-files", Key: "file" + i + ".wav" };
  
  //create metadata promise
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
  
        //if 10 seconds has passed since file was downloaded, reset flag to allow new download 
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

function downloadS3Promise(params) {
  
  //create download promise
  return new Promise((resolve, reject) => {
  
    //where to save the file to
    let uploadLocation = __dirname + "/App/public/uploads/" + params.Key;
  
    //create writable stream on disk at upload location and handle errors
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
    .then((currDL) => {
      downloadS3(currDL);
    })
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

var Particle = require("particle-api-js");
var particle = new Particle();
var token;
var index = 0;
var deviceIds = ["260027001747373335333438", "24002e000947373336323230", "39003b000e47373334323233"]

function getVarsPromise(token, id, name) {
  //console.log(token);
  return new Promise((resolve, reject) => {
    particle
      .getVariable({
        deviceId: id,
        name: name,
        auth: token,
      })
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      })
      .catch((err) => {
         reject(err);
         //console.log(err);
      })
  })
}

function getVars(token, id, name){
  getVarsPromise(token, id, name)
      .then((data) => {
           console.log(data.body.result);
           udpPort.send(
          {
            address: "/particle",
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
        getDevice();
      })
      .catch((err) => {
        //console.log(err);
        getDevice(token);
      })
}

let totalOnline = 0;
let allOffline = false;
function getDevice(token){
  if (index < deviceIds.length) {
    index++;
  } else {
    index = 0;
  }

  particle.getDevice({deviceId: deviceIds[index], auth: token})
    .then((device) => {
       if (device.body.online == true){
          totalOnline++;
          //allOffline = false;
          console.log("device:" + deviceIds[index] + "is online");
          getVars(token, deviceIds[index], Object.keys(device.body.variables));
       } else {
        if (totalOnline == 0 && index == deviceIds.length-1 && allOffline == false) {
          allOffline = true;
          console.log("No devices online");
        }
        getDevice(token);
       }
     })
     .catch((err) => {
      // console.log(err);
      getDevice(token);
     })

}

particle
  .login({ username: "thecapstoners2020@gmail.com", password: "capstone2020" })
  .then(function (data) {
    console.log("logged in to particle api");
    getDevice(data.body.access_token);
    })
  .catch(function (err) {
    //console.log("Could not log in.", err);
  });

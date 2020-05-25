const fs = require("fs");
const aws = require("aws-sdk");
aws.config.loadFromPath("credentials.json");
const s3 = new aws.S3();
var maxAPI = require("max-api");
var params = {
  Bucket: "capstone-audio-files",
  Key: "s1vals",
};
var params2 = {};
var subArray = [];
var array = [];
var i = 0;
var j = 0;
var k = 0;

setTimeout(() => {
  //setInterval(()=>{
  var it = setInterval(() => {
    if (i < 5) i++;
    else i = 0;
    var name = "file" + i + ".wav";
    //console.log(name);
    params.Key = name;
    //console.log(params);
    let uploadLocation = __dirname + "/App/public/uploads/" + name; // where to save the file to. make sure the incoming name has a .wav extension
    var file = fs.createWriteStream(uploadLocation);
    var object = s3.getObject(params).createReadStream();
    object.pipe(file);
    //if (i==5) clearInterval(it);
  }, 200);
}, 100);

// var toArray = require("stream-to-array");
// var it = setInterval(() => {
//   if (j < 9) j++;
//   else j = 0;

//   var name = "s" + (j + 1) + "vals";
//   //maxAPI.post(name);
//   params2.Bucket = "capstone-control-data";
//   params2.Key = name;
//   var object = s3.getObject(params2, (err, data) => {
//     var buffer = Buffer.from(data.Body);
//     array[j] = buffer.toString().split(",");
//     if (array[j]) {
//       maxAPI.outlet(j + " " + array[j][0]);
//     }
//   });
//   if (i == 9) {
//     clearInterval(it);
//   }
// }, 200);

var Particle = require("particle-api-js");
var particle = new Particle();
var token;

function getVars(token) {
  setInterval(() => {
    particle
      .getVariable({
        deviceId: "390037000e47373334323233",
        name: "flex",
        auth: token,
      })
      .then((data) => {
        maxAPI.post(data.body.result);
      })
      .catch((err) => {
        maxAPI.post(err["errorDescription"]);
      });
  }, 100);
}

particle
  .login({ username: "thecapstoners2020@gmail.com", password: "capstone2020" })
  .then(function (data) {
    maxAPI.post("logged in");
    getVars(data.body.access_token);
  })
  .catch(function (err) {
    console.log("Could not log in.", err);
  });

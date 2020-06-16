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


var Particle = require("particle-api-js");
var particle = new Particle();
var token;
var prevData;
let IDs = ["39003b000e47373334323233", "390037000e47373334323233", "330042000947373336323230", "230030001747373335333438"];
let names = ['flex', 'buttonState'];

function getVarFlex(token, name, id) {
  setInterval(() => {
    particle
      .getVariable({
        deviceId: id,
        name: name,
        auth: token,
      })
      .then((data) => {
        if (data.body.result && data.body.result!=prevData && name) {
         // maxAPI.post(data.body.result);
          maxAPI.outlet('pvar ' + data.body.result);
        }
		prevData = data.body.result;
      })
      .catch((err) => {
        //maxAPI.post(err["errorDescription"]);
      });
  }, 100);
}

particle
  .login({ username: "thecapstoners2020@gmail.com", password: "capstone2020" })
  .then(function (data) {
    maxAPI.post("logged in");
    for (var i = IDs.length - 1; i >= 0; i--) {
      getVarFlex(data.body.access_token, names[i], IDs[i]);
    }
  })
  .catch(function (err) {
    maxAPI.post('could not log in' + err);
  });

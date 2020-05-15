const fs = require('fs');
const aws = require('aws-sdk');
const s3 = new aws.S3();
var maxAPI = require('max-api')
aws.config.loadFromPath('./credentials.json');
var params = {
  Bucket: 'capstone-audio-files',
  Key: 's1vals',
};
var params2 = {};
var subArray = [];
var array = [];
var i = 0;
var j = 0;
var k=0;

setTimeout(() => {
  //setInterval(()=>{
    var it = setInterval(() => {
      if (i<5) i++;
      else i=0;
      var name = 'file' + i + '.wav';
      //console.log(name);
      params.Key = name;
      //console.log(params);
      let uploadLocation = __dirname + '/public/uploads/' + name; // where to save the file to. make sure the incoming name has a .wav extension
      var file = fs.createWriteStream(uploadLocation);
      var object = s3.getObject(params).createReadStream();
      object.pipe(file);
      //if (i==5) clearInterval(it);
    }, 200);
},100);


var toArray = require('stream-to-array');
  var it = setInterval(() => {
    if (j<9) j++;
    else j=0;

    var name = 's' + (j+1) + 'vals';
    //maxAPI.post(name);
    params2.Bucket = 'capstone-control-data';
    params2.Key = name;
    var object = s3.getObject(params2, (err,data) => {
      var buffer = Buffer.from(data.Body);
      array[j] = buffer.toString().split(",");
      if (array[j]) {
        maxAPI.outlet(j + ' ' + array[j][0])
      }

    });
    if (i==9) {
      clearInterval(it);
    }
  }, 200);
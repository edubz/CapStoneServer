const fs = require('fs');
const aws = require('aws-sdk');
const s3 = new aws.S3();
aws.config.loadFromPath('./credentials.json');
var params = {
  Bucket: 'capstone-audio-files',
  Key: '',
};
var i;
function iterate(){
  if (i<5) i++;
  else i=0;
}
setInterval(()=>{
  var it = setInterval(() => {
    iterate();
    var name = 'file' + i + '.wav';
    //console.log(name);
    params.Key = name;
    //console.log(params);
    let uploadLocation = __dirname + '/public/uploads/' + name; // where to save the file to. make sure the incoming name has a .wav extension
    var file = fs.createWriteStream(uploadLocation);
    var object = s3.getObject(params).createReadStream();
    object.pipe(file);
    if (i==5) clearInterval(it);
  }, 10);
}, 5000);
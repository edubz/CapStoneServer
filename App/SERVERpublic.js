/*
This script starts an express app to serve a 
static site over port 3000 or heroku's specified port. 
It also creates route called /upload to accept a file
from p5.js on the client side and upload it to an s3
bucket using multer middleware. 
*/
//declare express and start server instance
const express = require("express");
var app = express();
var server = require("http").createServer(app);
var port = process.env.PORT || 3000;
const io = require('socket.io')(server);
io.on('connection', (conn) => {
  console.log('new conn')
})

//set for audio file upload from p5js
// const aws = require("aws-sdk");
// const multer = require("multer");
 // const multer_s3 = require("multer-s3");
const fs = require("fs");

//gain access to s3
// const s3 = new aws.S3({
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey,
//   region: process.env.region,
// });

const multer = require('multer');
//configure the multer upload's storage settings. in this case uploads are stored in our s3 bucket
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname + '/public/uploads')
  },
  filename: function(req, file, cb){
    // console.log(file);
    cb(null, file.originalname);
  }
})

const upload = multer({storage: storage});

//single file upload
function uploadSingle(){

  upload.single("soundBlob");
}

//POST request route to allow p5js request to reach server in order to upload to s3 via multer
app.post("/upload", upload.single("soundBlob"), function (req, res) {
  // res.on('finish', () => {
    // console.log(req)
    io.emit('file uploaded', req.file.originalname)
  // })
  // uploadSingle(req, res, (err) => {
    
  // });
   //console.log(res);
});



//serve static site and listen on port 3000 or build platform port
app.use(express.static("public"));
server.listen(process.env.PORT || 3000);


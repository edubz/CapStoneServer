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
var server = require("http").Server(app);
var port = process.env.PORT || 3000;

//set for audio file upload from p5js
const aws = require("aws-sdk");
const multer = require("multer");
const multer_s3 = require("multer-s3");
const fs = require("fs");

//gain access to s3
const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

//configure the multer upload's storage settings. in this case uploads are stored in our s3 bucket
const upload = multer({
  storage: multer_s3({
    s3: s3,
    bucket: "capstone-audio-files",
    metadata: function (req, file, cb) {
      cb(null, { fieldname: file.originalname.toString() });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname.toString());
    },
  }),
});
//single file upload
var uploadSingle = upload.single("soundBlob");

//POST request route to allow p5js request to reach server in order to upload to s3 via multer
app.post("/upload", function (req, res) {
  uploadSingle(req, res, (err) => {
    console.log(err);
  });
  console.log(res);
});

//serve static site and listen on port 3000 or build platform port
app.use(express.static("public"));
server.listen(process.env.PORT || 3000);


const axiosHttpsRequest = require('axios');
const fs = require('fs');

let audioFiles = new Array(6).fill({});

module.exports.initialize = function(publicServerURL) {
  let thisBaseURL = publicServerURL + '/uploads/';

  audioFiles = audioFiles.map((file, i) => {
	let thisFileName = 'file' + i + '.wav';

	NewFileObject = {
	  name: thisFileName,
	  url: thisBaseURL + thisFileName,
	  data: null,
	  isAlreadyDownloading: false,
	  destination: './downloads/' + thisFileName
	};
	return NewFileObject;
  });
}

module.exports.findObjectByFilename = function(fileName) {
  return audioFiles.find(file => file.name === fileName);
}

module.exports.getFileFromPublicServer = function(thisFile) {
    return new Promise((resolve, reject) => {
    let options = {
      url: thisFile.url,
      method: 'GET',
      responseType: 'stream'
    };
    axiosHttpsRequest(options)
    .then((response) => {
        thisFile.data = response.data;
        resolve(thisFile);
    })
    .catch((err) => {
    	reject(console.log(err));
    })
  })
}

function httpsRequest() {
  
}

module.exports.saveFileToDisk = function(thisFile) {
  if (thisFile.isAlreadyDownloading == false){
    let newFile = fs.createWriteStream(thisFile.destination);
    let data = thisFile.data;
    data.pipe(newFile)
      .on('error', (e) => console.log(e))
      .on('data', () => thisFile.isDownloading = true)
      .on('finish', () => {
        thisFile.isDownloading = false;
        console.log('finished downloading ' + thisFile.name)
    })
  }
}
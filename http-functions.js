// DEPENDENCIES
var request = require('request')
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;
var createFile = fs.createWriteStream;


// DOWNLOAD AND IMAGE FROM A GIVEN URL TO A GIVEN FILEPATH
function downloadImageByURL(url, filePath) {
  // see if the given directory exists, if not create it
  mkdirp(getDirName(filePath), (err) => {
      if (err){
        throw err;
      }else{
        // make the request for downloading the image
        request.get(url)
           .on('error', function (err) {
             throw err;
           })
           .pipe(createFile(filePath))
           .on('finish', function(){
          });
      }
    });
}

module.exports = downloadImageByURL;
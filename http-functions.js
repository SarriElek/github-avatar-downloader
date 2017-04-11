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
        console.error('Error creating the directory',err.message);
      }else{
        // make the request for downloading the image
        request.get(url)
           .on('error', function (err) {
             console.error('Error downloading the avatar image', err.message);
           })
           .pipe(createFile(filePath));
      }
    });
}

module.exports = downloadImageByURL;
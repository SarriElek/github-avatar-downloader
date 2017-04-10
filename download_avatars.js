// DEPENDENCIES
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

// CONSTANTS
var GITHUB_USER = "SarriElek";
var GITHUB_TOKEN = "6179f8595adbefe65f64a10b78603cd49dbf5910";

// VARIABLES
var repoOwner = process.argv[2];
var repoName = process.argv[3];


// CALLBACK FUNCTION
var cb = function(err, response, body){
  var constributors = JSON.parse(body);
  constributors.forEach((contributor) => {
    // create the local filepath for downloading the image
    var filePath = `avatars/${contributor['login']}.jpg`;
    // download the avatar images
    downloadImageByURL(contributor['avatar_url'], filePath)
  });
};

// HELPER FUNCTION
function downloadImageByURL(url, filePath) {
  // see if the given directory exists, if not create it
  mkdirp(getDirName(filePath), function (err) {
    if (err)
      throw err;
  });

  // make the request for downloading the image
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function(){
      });
}


// WELCOME
console.log('Welcome to the GitHub Avatar Downloader!');

// Get all the contributors of the repo given
//request.get('https://api.github.com/repos/jquery/jquery/contributors')

function getRepoContributors(repoOwner, repoName, cb) {
  //format the URL with the given variables
  var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  //var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // set our custom options for the request
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  // make the request with our custom options and callback
  request.get(options, cb);
}

if(repoOwner && repoName){
  // CALL OUR FUNCTIION
  getRepoContributors(repoOwner, repoName, cb);
}else{
  console.log('Please enter both parameters, repository owner and repository name');
}
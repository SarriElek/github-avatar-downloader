// DEPENDENCIES
var request = require('request');
var fs = require('fs');

// CONSTANTS
var GITHUB_USER = "SarriElek";
var GITHUB_TOKEN = "6179f8595adbefe65f64a10b78603cd49dbf5910";

// VARIABLES
var repoOwner = "jquery";
var repoName = "jquery";

// CALLBACK FUNCTION
var cb = function(err, response, body){
  var constributors = JSON.parse(body);
  constributors.forEach((contributor) => {
    // download the avatar images
    console.log(contributor['avatar_url']);
  });
};

// HELPER FUNCTIONS
function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function(){
        console.log('Download complete.');
      });
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg");


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

// CALL OUR FUNCTIION
getRepoContributors(repoOwner, repoName, cb);
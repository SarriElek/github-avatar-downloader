// DEPENDENCIES
var request = require('request');

// CONSTANTS
var GITHUB_USER = "SarriElek";
var GITHUB_TOKEN = "6179f8595adbefe65f64a10b78603cd49dbf5910";

// VARIABLES
var repoOwner = "jquery";
var repoName = "jquery";

// CALLBACK FUNCTION
var cb = function(err, Result){
  console.log("Errors:", err);
  console.log("Result:", result);
}

// WELCOME
console.log('Welcome to the GitHub Avatar Downloader!');

// Get all the contributors of the repo given
//request.get('https://api.github.com/repos/jquery/jquery/contributors')

function getRepoContributors(repoOwner, repoName, cb) {
  //format the URL with the given variables
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

}

// CALL OUR FUNCTIION
getRepoContributors(repoOwner, repoName, cb);
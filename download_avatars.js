// DEPENDENCIES
var request = require('request');

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

}
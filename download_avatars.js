// CONFIG FILE
require('dotenv').config();
// DEPENDENCIES
var request = require('request');
var fs = require('fs');

// MODULES
var downloadImageByURL = require('./http-functions');


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

// WELCOME
console.log('Welcome to the GitHub Avatar Downloader!');

// Get all the contributors of the repo given
//request.get('https://api.github.com/repos/jquery/jquery/contributors')

function getRepoContributors(repoOwner, repoName, cb) {
  //format the URL with the given variables
  var requestURL = `https://${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
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

// CALL OUR FUNCTION

if(repoOwner && repoName){
  getRepoContributors(repoOwner, repoName, cb);
}else{
  console.log('Please enter both parameters, repository owner and repository name');
}
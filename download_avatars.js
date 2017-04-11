// CONFIG FILE
require('dotenv').config();
// DEPENDENCIES
var request = require('request');
var fs = require('fs');

// MODULES
var downloadImageByURL = require('./http-functions');


// VARIABLES
// var variableNum = process.argv.length;
var repoOwner = process.argv[2];
var repoName = process.argv[3];

if(!(process.env.GITHUB_USER && process.env.GITHUB_TOKEN)) {
  console.error('Please include your github credentials in the .env file');
  process.exit(1);
}

// the command line arguments are present
if(!(repoOwner && repoName)) {
  console.error('Please enter two parameters: repository owner and repository name');
  process.exit(2);
}



// CALLBACK FUNCTION
var cb = function(err, response, body) {
  if(err) {
    console.error('Incorrect Credentials', err.message);
    return;
  }

  try {
    var parsedBody = JSON.parse(body);
  } catch (err) {
    console.error('Failed to parse response body ', err.message);
    return;
  }

  if(parsedBody.message){
    console.error('Repository not found', parsedBody.message);
    return;
  }

  parsedBody.forEach((contributor) => {
    // create the local filepath for downloading the image
    var filePath = `avatars/${contributor['login']}.jpg`;
    // download the avatar images
    downloadImageByURL(contributor['avatar_url'], filePath)
  });
};

// WELCOME
console.log('Welcome to the GitHub Avatar Downloader!');

// we want to be sure that all the .env constants are present


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

// CALL OUR FUNCTION ONLY IF EVERYTHING WE NEED IS PRESENT
//  The .env file exists
    // the github credentials are pressent


//phew, we can finally do some work here
getRepoContributors(repoOwner, repoName, cb);


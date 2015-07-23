'use strict'

var remote = require('remote');
var BrowserWindow = remote.require('browser-window');
var twitterAPI = require('node-twitter-api');
var fs = remote.require('fs');
var path = remote.require('path');

var CACHE_FILE = path.join('./', 'token_twitter.json');
var twitter = new twitterAPI({
  consumerKey: 'D4p8XQDK5d61K3sl1BwWHHTjs',
  consumerSecret: 'nlVkLxQXNbZutajyewVW7cDCccycHmxHZeXRPy4t5jByyGD5bi',
  callback: 'http://localhost.com/'
});

$(function(){
  // $('#sign_in').on('click', function(){
  //   $('#tweetArea').slideToggle();
  // });
  $('#sign_in').on('click', function(){
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret) {
    var url = twitter.getAuthUrl(requestToken);
    var loginWindow = new BrowserWindow({width: 800, height: 600, resizable: false});
    loginWindow.webContents.on('will-navigate', function (event, url) {
      var matched;
      if(matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], function(error, accessToken, accessTokenSecret){
          console.log('accessToken', accessToken);
          console.log('accessTokenSecret', accessTokenSecret);
          var token = {
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
          };
          fs.writeFileSync(CACHE_FILE, JSON.stringify(token), 'utf8');

          twitter.statuses('lookup', accessToken, accessTokenSecret, function(error, data, response){
            if(error){
              console.error(error);
              return;
            }else{
              console.log(data);
            }
          });

          $('#sign_in').hide();
          $('#icon').show();
        });
      }
      event.preventDefault();
      setTimeout(function () {
        loginWindow.close();
      }, 0);
      });
      loginWindow.loadUrl(url);
    });
  });


});

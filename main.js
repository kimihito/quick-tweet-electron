'use strict'
var app = require('app')
var BrowserWindow = require('browser-window')
var Twitter = require('twitter');
var OAuth = require('oauth').OAuth;

require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit()
  }
})

app.on('ready', function(){

  // var authUrl = "https://api.twitter.com/oauth/authenticate?oauth_token=";
  var authUrl = 'https://api.twitter.com/oauth/authenticate?oauth_token=';
  var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'D4p8XQDK5d61K3sl1BwWHHTjs',
    'nlVkLxQXNbZutajyewVW7cDCccycHmxHZeXRPy4t5jByyGD5bi',
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error){
      console.error(error);
      return;
    }

    console.log('oauth_token : ' +  oauth_token);
    console.log('oauth_token_secret : ' + oauth_token_secret);
    var url = authUrl + oauth_token;
    var loginWindow = new BrowserWindow({width: 800, height: 600});
    loginWindow.webContents.on('will-navigate', function(event, url){
      var urlinfo = require('url').parse(url, true);
      if(urlinfo.query.oauth_verifier){
        oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, urlinfo.query.verifier, function(error, oauth_access_token, oauth_access_token_secret){
          if(error){
            console.error(error);
            return;
          }
          console.log('oauth_access_token : ' + oauth_access_token);
          console.log('oauth_access_token_secret : ' + oauth_access_token_secret);
          setTimeout(function(){
            loginWindow.close();
          },0);
        });
      }else{
        setTimeout(function(){
          loginWindow.close();
        },0);
      }
      event.preventDefault();
    });
    loginWindow.loadUrl(url);
  })
})

'use strict'
var app = require('app')
var BrowserWindow = require('browser-window')
var twitterAPI = require('node-twitter-api');
var fs = require('fs');
var path = require('path');

// var CACHE_FILE = path.join(app.getPath('cache'), 'quick-tweet-electron/token_twitter.json');
var CACHE_FILE = path.join('./', 'token_twitter.json');

require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit()
  }
})

app.on('ready', function(){
    mainWindow = new BrowserWindow({
      width: 600,
      height: 450,
      frame: false,
      transparent: true,
      resizable: false
    });
    mainWindow.loadUrl('file://' + __dirname + '/index.html')

    mainWindow.on('closed', function(){
      mainWindow = null
    })
})

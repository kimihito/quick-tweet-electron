'use strict'

var ngModule = angular.module('quickTweet',[]);

ngModule.controller('MainController', function($scope){
  var main = this;
  main.hoge = function() {
    return console.log('fooo!!!');
  }
});

'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[Math.floor(keys.length * Math.random())]];
  };

  var getRandomArrayLength = function (array) {
    return array.slice(Math.floor(Math.random() * array.length));
  };

  var getShuffledArray = function (array) {
    var arrRandom = [];
    for (var i = 0; i < array.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      arrRandom = array.slice(0, array.length);
      array[i] = array[j];
      array[j] = temp;
    }
    return arrRandom;
  };

  window.utils = {
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayLength: getRandomArrayLength,
    getRandomNumber: getRandomNumber,
    getRandomProperty: getRandomProperty,
    getShuffledArray: getShuffledArray
  };
})();

'use strict';

var HOUSE_NAME = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_PRICE = {
  min: 1000,
  max: 1000000
};
var HOUSE_LOCATION = {
  x: 600,
  y: 350
};
var PIN_LOCATION = {
  minX: 130,
  maxX: 630,
  minY: 130,
  maxY: 630
}
var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var HOUSE__ROOMS = {
  min: 1,
  max: 5
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getRandomNumber = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumberFromTwo = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getRandomLength = function (array) {
  return Math.floor(Math.random() * array.length);
};

var card = [
  {
    author: {
      avatar: 'img/avatars/user0' + '.png'
    },

    offer: {
      title: getRandomNumber(HOUSE_NAME),
      address: '500, 500',
      price: getRandomNumberFromTwo(HOUSE_PRICE.min, HOUSE_PRICE.max),
      type: getRandomNumber(HOUSE_TYPE),
      rooms: getRandomNumberFromTwo(HOUSE__ROOMS.min, HOUSE__ROOMS.max),
      guests: '5',
      checkin: getRandomNumber(CHECKIN),
      checkout: getRandomNumber(CHECKOUT),
      features: getRandomLength(FEATURES),
      description: '',
      photos: PHOTOS
    },

    location: {
      x: getRandomNumberFromTwo(PIN_LOCATION.minX, PIN_LOCATION.maxX),
      y: getRandomNumberFromTwo(PIN_LOCATION.minY, PIN_LOCATION.maxY)
    }
  }];

document.querySelector('.map').classList.remove('map--faded');

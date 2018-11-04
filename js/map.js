'use strict';

document.querySelector('.map').classList.remove('map--faded');

var HOUSE_NAME = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']
var HOUSE_PRICE = {
  min: 1000,
  max: 1000000
};
var HOUSE_LOCATION = {
  x: 600,
  y: 350
};
var HOUSE_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
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

var card = [
  {
    author: {
      avatar: 'img/avatars/user0' + '.png'
    },

    offer: {
      title: HOUSE_NAME[4],
      address: HOUSE_LOCATION.x,
      price: HOUSE_PRICE.min,
      type: getRandomNumber(HOUSE_TYPE),
      rooms: HOUSE__ROOMS.max,
      guests: '5',
      checkin: getRandomNumber(CHECKIN),
      checkout: getRandomNumber(CHECKOUT),
      features: FEATURES[5],
      description: '',
      photos: PHOTOS
    },

    location: {
      x: HOUSE_LOCATION.x,
      y: HOUSE_LOCATION.y
    }
  }];

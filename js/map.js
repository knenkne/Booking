'use strict';

var HOUSE_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_PRICE = {
  min: 1000,
  max: 1000000
};
var HOUSE_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунагло'
};
var HOUSE_ROOMS = {
  min: 1,
  max: 5
};
var HOUSE_GUESTS = {
  min: 0,
  max: 10
};
var HOUSE_CHECKIN = ['12:00, 13:00, 14:00'];
var HOUSE_CHECKOUT = ['12:00, 13:00, 14:00'];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_DESCRIPTION = '';
var HOUSE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN = {
  min: {
    x: 0,
    y: 130
  },
  max: {
    x: 1280,
    y: 630
  }
};
var USER_AVATAR = {
  path: 'img/avatars/user',
  type: 'png'
};
var ADS_MAX = 8;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var ad = {
  author: {
    avatar: ''
  },
  offer: {
    title: getRandomArrayElement(HOUSE_TITLE),
    address: '',
    price: getRandomNumber(HOUSE_PRICE.min, HOUSE_PRICE.max),
    type: '',
    rooms: getRandomNumber(HOUSE_ROOMS.min, HOUSE_ROOMS.max),
    guests: getRandomNumber(HOUSE_GUESTS.min, HOUSE_GUESTS.max),
    checkin: getRandomArrayElement(HOUSE_CHECKIN),
    checkout: getRandomArrayElement(HOUSE_CHECKOUT),
    features: '',
    description: '',
    photos: ''
  },
  location: {
    x: getRandomNumber(PIN.min.x, PIN.max.x),
    y: getRandomNumber(PIN.min.y, PIN.max.y)
  }
};

var renderAds = function () {
  var ads = [];
  for (var i = 0; i < ADS_MAX; i++) {
    ads.push(ad);
  }
};

document.querySelector('.map').classList.remove('map--faded');
renderAds();

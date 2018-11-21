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
var MAX_ADS = 8;

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

// Генерируем аватарки
var AVATARS = [];
for (var i = 0; i < MAX_ADS; i++) {
  AVATARS.push('0' + (i + 1) + '.');
}

// Генерируем несколько объявлений
var generateAds = function () {
  var ads = [];
  for (var j = 0; j < MAX_ADS; j++) {
    var ad = {
      author: {
        avatar: USER_AVATAR.path + AVATARS[j] + USER_AVATAR.type
      },
      offer: {
        title: getRandomArrayElement(HOUSE_TITLE),
        address: location.x + ', ' + location.y,
        price: getRandomNumber(HOUSE_PRICE.min, HOUSE_PRICE.max),
        type: getRandomProperty(HOUSE_TYPE),
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
    ads.push(ad);
  }
  return ads;
};
var ADS = generateAds();

// Генерируем метку
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var renderPin = function () {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = ADS[j].location.x + 'px';
  pinElement.style.top = ADS[j].location.y + 'px';
  pinElement.querySelector('img').alt = ADS[j].offer.title;
  pinElement.querySelector('img').src = ADS[j].author.avatar;

  return pinElement;
};

// Генерируем несколько меток и карточек
var fragment = document.createDocumentFragment();
var similarPinList = document.querySelector('.map__pins');
var map = document.querySelector('.map');
for (var j = 0; j < MAX_ADS; j++) {
  fragment.appendChild(renderPin());
}
similarPinList.appendChild(fragment);

document.querySelector('.map').classList.remove('map--faded');

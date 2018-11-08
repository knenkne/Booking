'use strict';

var HOUSE_NAME = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_PRICE = {
  min: 1000,
  max: 1000000
};
var PIN_LOCATION = {
  minX: 0,
  maxX: 1200,
  minY: 130,
  maxY: 630
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
var AVATAR = {
  path: 'img/avatars/user',
  type: '.png'
};
var MAX_ADS = 8;

var getRandomNumber = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumberFromTwo = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getRandomLength = function (array) {
  return Math.floor(Math.random() * array.length);
};

var renderAvatars = function (i) {
  var number = i + 1;
  if (i >= 9) {
    return AVATAR.path + number + AVATAR.type;
  }
  return AVATAR.path + '0' + number + AVATAR.type;
};

var generateAd = function () {
  var ads = [];
  for (var i = 0; i < MAX_ADS; i++) {
    ads.push({
      author: {
        avatar: renderAvatars(i)
      },

      offer: {
        title: getRandomNumber(HOUSE_NAME),
        address: location.x + ', ' + location.y,
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
    });
  }
  return ads;
};
var ads = generateAd();

document.querySelector('.map').classList.remove('map--faded');
var similarListPin = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderPins = function (i) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = ads[i].location.x + 'px';
  pinElement.style.top = ads[i].location.y + 'px';
  pinElement.querySelector('img').src = ads[i].author.avatar;
  pinElement.querySelector('img').alt = ads[i].offer.title;
  return pinElement;
};

var setPins = function () {
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragmentPins.appendChild(renderPins(i));
  }
  similarListPin.appendChild(fragmentPins);
};


var similarCardList = document.querySelector('.map__filters-container');
var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderCards = function (i) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ads[i].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ads[i].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ads[i].offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ads[i].offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = ads[i].offer.rooms + ' комнаты для ' + ads[i].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[i].offer.checkin + ', выезд до' + ads[i].offer.checkout;
  cardElement.querySelector('.popup__features').appendChild = ads[i].offer.feautres;
  cardElement.querySelector('.popup__description').textContent = ads[i].offer.description;
  cardElement.querySelector('.popup__avatar').src = ads[i].author.avatar;
  return cardElement;
};

var setCards = function () {
  var fragmentCards = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragmentCards.appendChild(renderCards(i));
  }
  similarCardList.appendChild(fragmentCards);
};

setPins();
setCards();

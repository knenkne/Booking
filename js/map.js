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
var HOUSE_CHECK = ['12:00', '13:00', '14:00'];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_DESCRIPTION = '';
var HOUSE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN = {
  min: {
    x: 0,
    y: 130
  },
  max: {
    x: 1200,
    y: 630
  },
  width: 50,
  height: 70
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

var getRandomArrayLength = function (array) {
  return array.slice(Math.floor(Math.random() * array.length));
};

var getShuffledArray = function (array) {
  var j;
  var x;
  var i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

// Генерируем аватарки
var avatars = [];
for (var i = 0; i < MAX_ADS; i++) {
  avatars.push('0' + (i + 1) + '.');
}

// Генерируем фотографию
var generatePhoto = function () {
  var newPhoto = document.createElement('img');
  newPhoto.className = 'popup__photo';
  newPhoto.width = '45';
  newPhoto.height = '40';
  newPhoto.alt = 'Фотография жилья';
  return newPhoto;
};

// Генерируем удобства
var generateFeature = function (feature) {
  var newFeature = document.createElement('li');
  newFeature.className = 'popup__feature popup__feature--' + feature;
  return newFeature;
};

// Генерируем несколько объявлений
var generateAds = function () {
  var ads = [];
  for (var j = 0; j < MAX_ADS; j++) {
    var locationX = getRandomNumber(PIN.min.x, PIN.max.x);
    var locationY = getRandomNumber(PIN.min.y, PIN.max.y);
    var ad = {
      author: {
        avatar: USER_AVATAR.path + avatars[j] + USER_AVATAR.type
      },
      offer: {
        title: HOUSE_TITLE[j],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(HOUSE_PRICE.min, HOUSE_PRICE.max),
        type: getRandomProperty(HOUSE_TYPE),
        rooms: getRandomNumber(HOUSE_ROOMS.min, HOUSE_ROOMS.max),
        guests: getRandomNumber(HOUSE_GUESTS.min, HOUSE_GUESTS.max),
        checkin: getRandomArrayElement(HOUSE_CHECK),
        checkout: getRandomArrayElement(HOUSE_CHECK),
        features: getRandomArrayLength(HOUSE_FEATURES),
        description: HOUSE_DESCRIPTION,
        photos: getShuffledArray(HOUSE_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    ads.push(ad);
  }
  return ads;
};
var ADS = generateAds();
// Генерируем метку
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var renderPin = function (ad) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = ad.location.x + PIN.width / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN.height + 'px';
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.querySelector('img').src = ad.author.avatar;

  return pinElement;
};


// Генерируем карточку
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var renderCard = function (ad) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ad.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  // Удаляем старое фото и добавляем новые
  var photos = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__photo');
  photos.removeChild(photo);
  for (var j = 0; j < ad.offer.photos.length; j++) {
    var newPhoto = generatePhoto();
    newPhoto.src = ad.offer.photos[j];
    photos.appendChild(newPhoto);
  }
  // Удаляем старые фичи и добавляем новые
  var features = cardElement.querySelector('.popup__features');
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }
  for (var k = 0; k < ad.offer.features.length; k++) {
    var newFeature = generateFeature(ad.offer.features[k]);
    features.appendChild(newFeature);
  }
  return cardElement;
};

// Генерируем несколько меток и карточек
var fragment = document.createDocumentFragment();
var similarPinList = document.querySelector('.map__pins');
var similarCardList = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var filters = document.querySelector('.map__filters');
var address = document.querySelector('#address');
map.insertBefore(renderCard(ADS[0]), similarCardList);
for (var j = 0; j < MAX_ADS; j++) {
  fragment.appendChild(renderPin(ADS[j]));
}
similarPinList.appendChild(fragment);


// Events
var MAIN_PIN = {
  width: 65,
  height: 65
};

var activatePage = function () {
  var fieldsets = form.querySelectorAll('[disabled]');
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  filters.removeAttribute('disabled');
  for (var k = 0; k < fieldsets.length; k++) {
    fieldsets[k].removeAttribute('disabled');
  }
};

var mainPin = document.querySelector('.map__pin--main');
var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
address.value = mainPin.style.left + ', ' + mainPin.style.top;
mainPin.addEventListener('mouseup', function () {
  activatePage();
});
for (var k = 1; k < pins.length; k++) {
  pins[k].addEventListener('click', function () {
    map.insertBefore(renderCard(ADS[k]), similarCardList);
  });
}
console.log(pins);

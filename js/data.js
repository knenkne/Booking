'use strict';

(function () {

  var HOUSE_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSE_PRICE = {
    min: 1000,
    max: 1000000,
  };
  var HOUSE_TYPE = {
    palace: {
      name: 'Дворец',
      price: 10000
    },
    flat: {
      name: 'Квартира',
      price: 1000
    },
    house: {
      name: 'Дом',
      price: 5000
    },
    bungalo: {
      name: 'Бунагло',
      price: 0
    }
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
  var MAIN_PIN = {
    width: 65,
    height: 65,
    tip: 22,
    top: 375,
    left: 570
  };
  var USER_AVATAR = {
    path: 'img/avatars/user',
    type: 'png'
  };
  var MAX_ADS = 5;
  var KEYCODES = {
    esc: 27,
    enter: 13
  };

  var ads = [];

  window.data = {
    MAX_ADS: MAX_ADS,
    MAIN_PIN: MAIN_PIN,
    PIN: PIN,
    USER_AVATAR: USER_AVATAR,
    HOUSE_TITLE: HOUSE_TITLE,
    HOUSE_TYPE: HOUSE_TYPE,
    HOUSE_PRICE: HOUSE_PRICE,
    HOUSE_ROOMS: HOUSE_ROOMS,
    HOUSE_CHECK: HOUSE_CHECK,
    HOUSE_DESCRIPTION: HOUSE_DESCRIPTION,
    HOUSE_PHOTOS: HOUSE_PHOTOS,
    HOUSE_FEATURES: HOUSE_FEATURES,
    HOUSE_GUESTS: HOUSE_GUESTS,
    KEYCODES: KEYCODES,
    ads: ads,
  };
})();

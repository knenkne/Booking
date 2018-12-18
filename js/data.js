'use strict';

(function () {

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

  var HOUSE_PRICE = {
    low: 10000,
    high: 50000
  };

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

  var MAX_ADS = 5;
  var KEYCODES = {
    esc: 27,
    enter: 13
  };

  var ads = [];
  var loadingFlag = false;

  window.data = {
    MAX_ADS: MAX_ADS,
    MAIN_PIN: MAIN_PIN,
    HOUSE_PRICE: HOUSE_PRICE,
    PIN: PIN,
    HOUSE_TYPE: HOUSE_TYPE,
    KEYCODES: KEYCODES,
    ads: ads,
    loadingFlag: loadingFlag
  };
})();

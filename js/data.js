'use strict';

(function () {

  var HouseType = {
    PALACE: {
      name: 'Дворец',
      price: 10000
    },
    FLAT: {
      name: 'Квартира',
      price: 1000
    },
    HOUSE: {
      name: 'Дом',
      price: 5000
    },
    BUNGALO: {
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
  var Keycodes = {
    ESC: 27,
    ENTER: 13
  };

  var Errorcodes = {
    OK: 200
  };

  var XHR_TIMEOUT = 10000;
  var ads = [];
  var loadingFlag = false;

  window.data = {
    MAX_ADS: MAX_ADS,
    MAIN_PIN: MAIN_PIN,
    HOUSE_PRICE: HOUSE_PRICE,
    PIN: PIN,
    HouseType: HouseType,
    Keycodes: Keycodes,
    Errorcodes: Errorcodes,
    XHR_TIMEOUT: XHR_TIMEOUT,
    ads: ads,
    loadingFlag: loadingFlag
  };
})();

'use strict';

(function () {

  var utils = window.utils;
  var data = window.data;
  var pin = window.pin;
  var fragment = document.createDocumentFragment();
  var similarPinList = document.querySelector('.map__pins');
  var mapItem = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('[disabled]:not(option)');
  var address = form.querySelector('#address');

  // Генерируем аватарки
  var avatars = [];
  for (var i = 0; i < data.MAX_ADS; i++) {
    avatars.push('0' + (i + 1) + '.');
  }

  // Генерируем несколько объявлений
  var generateAds = function () {
    var ads = [];
    for (var j = 0; j < data.MAX_ADS; j++) {
      var locationX = utils.getRandomNumber(data.PIN.min.x + data.PIN.width, data.PIN.max.x - data.PIN.width);
      var locationY = utils.getRandomNumber(data.PIN.min.y - data.PIN.height, data.PIN.max.y - data.PIN.height);
      var ad = {
        author: {
          avatar: data.USER_AVATAR.path + avatars[j] + data.USER_AVATAR.type
        },
        offer: {
          title: data.HOUSE_TITLE[j],
          address: (locationX + data.PIN.width / 2) + ', ' + (locationY + data.PIN.height),
          price: utils.getRandomNumber(data.HOUSE_PRICE.min, data.HOUSE_PRICE.max),
          type: utils.getRandomProperty(data.HOUSE_TYPE).name,
          rooms: utils.getRandomNumber(data.HOUSE_ROOMS.min, data.HOUSE_ROOMS.max),
          guests: utils.getRandomNumber(data.HOUSE_GUESTS.min, data.HOUSE_GUESTS.max),
          checkin: utils.getRandomArrayElement(data.HOUSE_CHECK),
          checkout: utils.getRandomArrayElement(data.HOUSE_CHECK),
          features: utils.getRandomArrayLength(data.HOUSE_FEATURES),
          description: utils.HOUSE_DESCRIPTION,
          photos: utils.getShuffledArray(data.HOUSE_PHOTOS)
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

  // Активируем страницу
  var activatePage = function () {

    // Убираем атрибуты disabled, заполняем адрес
    address.value = Math.round((parseInt(mainPin.style.left, 10)) + data.MAIN_PIN.width / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (data.MAIN_PIN.height + data.MAIN_PIN.tip));
    mapItem.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].removeAttribute('disabled');
    }

    // Отрисовываем пины
    if (data.ads.length === 0) {
      data.ads = generateAds();
      for (var j = 0; j < data.MAX_ADS; j++) {
        var pinItem = pin.renderPin(data.ads[j]);
        pinItem.setAttribute('data-pin-number', j);
        fragment.appendChild(pinItem);
      }
    }
    similarPinList.appendChild(fragment);
  };

  // Перемещение пина
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      activatePage();

      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var mapWidth = mapItem.offsetWidth - mainPin.offsetWidth;
      if (newCoords.x > mapWidth) {
        newCoords.x = mapWidth;
      } else if (newCoords.x < 0) {
        newCoords.x = 0;
      }

      if (newCoords.y > data.PIN.max.y - (data.MAIN_PIN.height + data.MAIN_PIN.tip)) {
        newCoords.y = data.PIN.max.y - (data.MAIN_PIN.height + data.MAIN_PIN.tip);
      } else if (newCoords.y < data.PIN.min.y - (data.MAIN_PIN.height + data.MAIN_PIN.tip)) {
        newCoords.y = data.PIN.min.y - (data.MAIN_PIN.height + data.MAIN_PIN.tip);
      }

      mainPin.style.top = newCoords.y + 'px';
      mainPin.style.left = newCoords.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mainPin: mainPin,
    address: address,
    mapItem: mapItem,
    fieldsets: fieldsets,
  };
})();

'use strict';

(function () {

  var fragment = document.createDocumentFragment();
  var similarPinList = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('[disabled]:not(option)');
  var address = form.querySelector('#address');

  // Генерируем аватарки
  var avatars = [];
  for (var i = 0; i < window.data.MAX_ADS; i++) {
    avatars.push('0' + (i + 1) + '.');
  }

  // Генерируем несколько объявлений
  var generateAds = function () {
    var ads = [];
    for (var j = 0; j < window.data.MAX_ADS; j++) {
      var locationX = window.data.getRandomNumber(window.data.PIN.min.x + window.data.PIN.width, window.data.PIN.max.x - window.data.PIN.width);
      var locationY = window.data.getRandomNumber(window.data.PIN.min.y - window.data.PIN.height, window.data.PIN.max.y - window.data.PIN.height);
      var ad = {
        author: {
          avatar: window.data.USER_AVATAR.path + avatars[j] + window.data.USER_AVATAR.type
        },
        offer: {
          title: window.data.HOUSE_TITLE[j],
          address: (locationX + window.data.PIN.width / 2) + ', ' + (locationY + window.data.PIN.height),
          price: window.data.getRandomNumber(window.data.HOUSE_PRICE.min, window.data.HOUSE_PRICE.max),
          type: window.data.getRandomProperty(window.data.HOUSE_TYPE).name,
          rooms: window.data.getRandomNumber(window.data.HOUSE_ROOMS.min, window.data.HOUSE_ROOMS.max),
          guests: window.data.getRandomNumber(window.data.HOUSE_GUESTS.min, window.data.HOUSE_GUESTS.max),
          checkin: window.data.getRandomArrayElement(window.data.HOUSE_CHECK),
          checkout: window.data.getRandomArrayElement(window.data.HOUSE_CHECK),
          features: window.data.getRandomArrayLength(window.data.HOUSE_FEATURES),
          description: window.data.HOUSE_DESCRIPTION,
          photos: window.data.getShuffledArray(window.data.HOUSE_PHOTOS)
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
    address.value = Math.round((parseInt(mainPin.style.left, 10)) + window.data.MAIN_PIN.width / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (window.data.MAIN_PIN.height + window.data.MAIN_PIN.tip));
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].removeAttribute('disabled');
    }

    // Отрисовываем пины
    if (window.data.ads.length === 0) {
      window.data.ads = generateAds();
      for (var j = 0; j < window.data.MAX_ADS; j++) {
        var pin = window.pin.renderPin(window.data.ads[j]);
        pin.setAttribute('data-pin-number', j);
        fragment.appendChild(pin);
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

      var mapWidth = map.offsetWidth - mainPin.offsetWidth;
      if (newCoords.x > mapWidth) {
        newCoords.x = mapWidth;
      } else if (newCoords.x < 0) {
        newCoords.x = 0;
      }

      if (newCoords.y > window.data.PIN.max.y - (window.data.MAIN_PIN.height + window.data.MAIN_PIN.tip)) {
        newCoords.y = window.data.PIN.max.y - (window.data.MAIN_PIN.height + window.data.MAIN_PIN.tip);
      } else if (newCoords.y < window.data.PIN.min.y - (window.data.MAIN_PIN.height + window.data.MAIN_PIN.tip)) {
        newCoords.y = window.data.PIN.min.y - (window.data.MAIN_PIN.height + window.data.MAIN_PIN.tip);
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
    map: map,
    fieldsets: fieldsets,
  };
})();

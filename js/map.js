'use strict';

(function () {

  var data = window.data;
  var pin = window.pin;
  var fragment = document.createDocumentFragment();
  var similarPinList = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('[disabled]:not(option)');
  var address = form.querySelector('#address');
  // Генерируем аватарки
  var avatars = [];
  for (var i = 0; i < data.MAX_ADS; i++) {
    avatars.push('0' + (i + 1) + '.');
  }

  // Активируем страницу
  var activatePage = function () {

    // Убираем атрибуты disabled, заполняем адрес
    address.value = Math.round((parseInt(mainPin.style.left, 10)) + data.MAIN_PIN.width / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (data.MAIN_PIN.height + data.MAIN_PIN.tip));
    pin.mapItem.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].removeAttribute('disabled');
    }

    // Отрисовываем пины
    var successHandler = function (ads) {
      data.ads = ads;
      for (var j = 0; j < data.MAX_ADS; j++) {
        var pinItem = pin.renderPin(ads[j]);
        pinItem.setAttribute('data-pin-number', j);
        fragment.appendChild(pinItem);
      }
    };
    var errorHandler = function (message) {
      var main = document.querySelector('main');
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      var errorMessage = errorElement.querySelector('.error__message');
      var errorButton = errorElement.querySelector('.error__button');
      var errorClose = function () {
        errorElement.remove();
      };
      errorButton.addEventListener('click', errorClose);
      document.addEventListener('click', errorClose);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === data.KEYCODES.esc) {
          errorClose();
        }
      });
      errorMessage.textContent = message;
      main.insertAdjacentElement('afterbegin', errorElement);
    };
    similarPinList.appendChild(fragment);
    if (data.loadingHandler === false) {
      data.loadingHandler = true;
      window.load(successHandler, errorHandler);
    }
  };

  // Перемещение пинаа
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

      var mapWidth = pin.mapItem.offsetWidth - mainPin.offsetWidth;
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
    fieldsets: fieldsets,
  };
})();

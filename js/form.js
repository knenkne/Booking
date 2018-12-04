'use strict';
(function () {
  // Заполняем строку адреса
  var form = document.querySelector('.ad-form');
  window.map.address.value = Math.round((parseInt(window.map.mainPin.style.left, 10)) + window.data.MAIN_PIN.width / 2) + ', ' + Math.round((parseInt(window.map.mainPin.style.top, 10) + window.data.MAIN_PIN.height / 2));

  // Синхронизируем тип жилья с минимальной стоимостью
  var typeList = form.querySelector('#type');
  var priceField = form.querySelector('#price');
  var onTypePriceChange = function () {
    var keys = Object.keys(window.data.HOUSE_TYPE);
    var getPriceByType = function (name) {
      return window.data.HOUSE_TYPE[name].price;
    };
    for (var j = 0; j < keys.length; j++) {
      if (typeList.value === keys[j]) {
        priceField.placeholder = getPriceByType(keys[j]);
        priceField.setAttribute('min', getPriceByType(keys[j]));
      }
    }
  };
  typeList.addEventListener('change', onTypePriceChange);

  // Синхронизум время заезда и выезда
  var time = form.querySelector('.ad-form__element--time');
  var timeinList = time.querySelector('#timein');
  var timeoutList = time.querySelector('#timeout');
  var syncTimeOut = function () {
    timeoutList.value = timeinList.value;
  };
  var syncTimeIn = function () {
    timeinList.value = timeoutList.value;
  };
  timeinList.addEventListener('change', syncTimeOut);
  timeoutList.addEventListener('change', syncTimeIn);

  // Синхронизируем ко-во комнат и гостей
  var roomsList = form.querySelector('#room_number');
  var guestsList = form.querySelector('#capacity');
  var options = guestsList.querySelectorAll('option');
  var setDisabled = function () {
    for (var j = 0; j < options.length; j++) {
      options[j].setAttribute('disabled', '');
    }
  };
  var onRoomsGuestsChange = function () {
    setDisabled();
    for (var j = 0; j < options.length; j++) {
      if (roomsList.value >= options[j].value) {
        options[j].removeAttribute('disabled');
        options[options.length - 1].setAttribute('disabled', '');
      }
      if (roomsList.value === '100') {
        options[0].setAttribute('disabled', '');
        options[options.length - 1].removeAttribute('disabled');
        guestsList.value = '0';
      }
      if (roomsList.value < options[j].value || guestsList.value === '0' && roomsList.value !== '100') {
        guestsList.value = '1';
      }
    }
  };
  var onGuestsRoomsChange = function () {
    for (var j = 0; j < options.length; j++) {
      if (roomsList.value < options[j]) {
        roomsList.value = guestsList.value;
      }
    }
  };
  roomsList.addEventListener('change', onRoomsGuestsChange);
  guestsList.addEventListener('change', onGuestsRoomsChange);

  // Проверяем валидность полей
  var submitButton = form.querySelector('.ad-form__submit');
  var fields = form.querySelectorAll('input');
  submitButton.addEventListener('click', function () {
    for (var j = 0; j < fields.length; j++) {
      if (!fields[j].checkValidity()) {
        fields[j].style.boxShadow = '0 0 2px 2px red';
      } else {
        fields[j].style.boxShadow = '';
      }
    }
  });
  // Возвращаем неактивное состояние
  var resetButton = form.querySelector('.ad-form__reset');
  var resetPage = function () {
    form.reset();
    priceField.placeholder = '1000';
    priceField.setAttribute('min', '1000');
    window.map.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    timeinList[0].setAttribute('selected', '');
    timeoutList[0].setAttribute('selected', '');
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var m = 0; m < pins.length; m++) {
      pins[m].remove();
      window.data.ads = [];
    }
    for (var o = 0; o < window.map.fieldsets.length; o++) {
      window.map.fieldsets[o].setAttribute('disabled', '');
    }
    for (var k = 0; k < fields.length; k++) {
      if (fields[k].checkValidity()) {
        fields[k].style.boxShadow = '';
      }
    }
    guestsList.style.boxShadow = '';
    window.map.mainPin.style.top = window.data.MAIN_PIN.top + 'px';
    window.map.mainPin.style.left = window.data.MAIN_PIN.left + 'px';
    window.map.address.value = (parseInt(window.map.mainPin.style.left, 10) + window.data.MAIN_PIN.width / 2) + ', ' + (parseInt(window.map.mainPin.style.top, 10) + window.data.MAIN_PIN.height / 2);
  };
  resetButton.addEventListener('click', resetPage);
})();

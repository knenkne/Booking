'use strict';
(function () {

  var map = window.map;
  var data = window.data;
  var pin = window.pin;
  var removePopup = window.card.removePopup;
  var backend = window.backend;
  var resetAvatar = window.avatar.reset;
  var resetImages = window.images.reset;
  var form = document.querySelector('.ad-form');
  var typeList = form.querySelector('#type');
  var priceField = form.querySelector('#price');
  var time = form.querySelector('.ad-form__element--time');
  var timeinList = time.querySelector('#timein');
  var timeoutList = time.querySelector('#timeout');
  var submitButton = form.querySelector('.ad-form__submit');
  var fields = form.querySelectorAll('input');
  var resetButton = form.querySelector('.ad-form__reset');
  var roomsList = form.querySelector('#room_number');
  var guestsList = form.querySelector('#capacity');
  var options = guestsList.querySelectorAll('option');

  // Заполняем строку адреса
  map.address.value = Math.round((parseInt(map.mainPin.style.left, 10)) + data.MAIN_PIN.width / 2) + ', ' + Math.round((parseInt(map.mainPin.style.top, 10) + data.MAIN_PIN.height / 2));

  // Синхронизируем тип жилья с минимальной стоимостью
  var onTypePriceChange = function () {
    var keys = Object.keys(data.HOUSE_TYPE);
    var getPriceByType = function (name) {
      return data.HOUSE_TYPE[name].price;
    };
    keys.forEach(function (key) {
      if (typeList.value === key) {
        priceField.placeholder = getPriceByType(key);
        priceField.setAttribute('min', getPriceByType(key));
      }
    });
  };
  typeList.addEventListener('change', onTypePriceChange);

  // Синхронизум время заезда и выезда
  var onTimeinTimeoutChange = function () {
    timeoutList.value = timeinList.value;
  };
  var onTimeoutTimeinChange = function () {
    timeinList.value = timeoutList.value;
  };
  timeinList.addEventListener('change', onTimeinTimeoutChange);
  timeoutList.addEventListener('change', onTimeoutTimeinChange);

  // Синхронизируем ко-во комнат и гостей
  var setDisabled = function () {
    options.forEach(function (option) {
      option.setAttribute('disabled', '');
    });
  };
  var onRoomsGuestsChange = function () {
    setDisabled();
    options.forEach(function (option) {
      if (roomsList.value >= option.value) {
        option.removeAttribute('disabled');
        options[options.length - 1].setAttribute('disabled', '');
      }
      if (roomsList.value === '100') {
        options[0].setAttribute('disabled', '');
        options[options.length - 1].removeAttribute('disabled');
        guestsList.value = '0';
      }
      if (roomsList.value < option.value || guestsList.value === '0' && roomsList.value !== '100') {
        guestsList.value = '1';
      }
    });
  };
  var onGuestsRoomsChange = function () {
    options.forEach(function (option) {
      if (roomsList.value < option) {
        roomsList.value = guestsList.value;
      }
    });
  };
  roomsList.addEventListener('change', onRoomsGuestsChange);
  guestsList.addEventListener('change', onGuestsRoomsChange);

  // Проверяем валидность полей
  submitButton.addEventListener('click', function () {
    fields.forEach(function (field) {
      if (!field.checkValidity()) {
        field.style.boxShadow = '0 0 2px 2px red';
      } else {
        field.style.boxShadow = '';
      }
    });
  });

  // Возвращаем неактивное состояние
  var onResetButtonResetPage = function () {
    form.reset();
    data.loadingFlag = false;
    priceField.placeholder = '1000';
    priceField.setAttribute('min', '1000');
    pin.mapItem.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    timeinList[0].setAttribute('selected', '');
    timeoutList[0].setAttribute('selected', '');
    removePopup();
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.remove();
      data.ads = [];
    });
    map.fieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', '');
    });
    fields.forEach(function (field) {
      if (field.checkValidity()) {
        field.style.boxShadow = '';
      }
    });
    guestsList.style.boxShadow = '';
    map.mainPin.style.top = data.MAIN_PIN.top + 'px';
    map.mainPin.style.left = data.MAIN_PIN.left + 'px';
    map.address.value = Math.round((parseInt(map.mainPin.style.left, 10) + data.MAIN_PIN.width / 2)) + ', ' + Math.round((parseInt(map.mainPin.style.top, 10) + data.MAIN_PIN.height / 2));
    resetAvatar();
    resetImages();
  };
  resetButton.addEventListener('click', onResetButtonResetPage);

  var onLoadSuccess = function () {
    onResetButtonResetPage();
    var main = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var successClose = function () {
      successElement.remove();
    };
    document.addEventListener('click', successClose);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === data.KeyCodes.ESC) {
        successClose();
      }
    });
    main.insertAdjacentElement('afterbegin', successElement);
  };

  form.addEventListener('submit', function (evt) {
    backend.upload(new FormData(form), onLoadSuccess, backend.onLoadError);
    evt.preventDefault();
  });

})();

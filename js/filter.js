'use strict';

(function () {

  var data = window.data;
  var pin = window.pin;
  var map = window.map;
  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var roomsFilter = filters.querySelector('#housing-rooms');

  // Фильтруем по типу
  typeFilter.addEventListener('change', function () {

    // Удаляем пины
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.remove();
    });

    // Удаляем попап, взять из form.js
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    var selectedIndex = typeFilter.options[typeFilter.selectedIndex];

    // Фильтруем массив
    var getArrayByType = data.ads.filter(function (type) {
      return type.offer.type === selectedIndex.value;
    });

    // Отрисовываем новые пины на основе массива
    if (selectedIndex.value === 'any') {
      var ads = data.ads;
      // Взять из map.js
      for (var i = 0; i < data.MAX_ADS; i++) {
        if (data.ads[i].offer) {
          var pinItem = pin.renderPin(ads[i], ads);
          pinItem.setAttribute('data-pin-number', i);
          map.fragment.appendChild(pinItem);
        }
      }
    }
    for (var j = 0; j < getArrayByType.length; j++) {
      pinItem = pin.renderPin(getArrayByType[j], getArrayByType);
      pinItem.setAttribute('data-pin-number', j);
      map.fragment.appendChild(pinItem);
    }
    map.similarPinList.appendChild(map.fragment);
  });

  // Фильтруем по комнатам
  roomsFilter.addEventListener('change', function () {

    // Удаляем пины
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.remove();
    });

    // Удаляем попап, взять из form.js
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    var selectedIndex = roomsFilter.options[roomsFilter.selectedIndex];

    // Фильтруем массив
    var getArrayByRooms = data.ads.filter(function (rooms) {
      return rooms.offer.rooms === parseInt(selectedIndex.value, 10);
    });

    // Отрисовываем новые пины на основе массива
    if (selectedIndex.value === 'any') {
      var ads = data.ads;
      // Взять из map.js
      for (var i = 0; i < data.MAX_ADS; i++) {
        if (data.ads[i].offer) {
          var pinItem = pin.renderPin(ads[i], ads);
          pinItem.setAttribute('data-pin-number', i);
          map.fragment.appendChild(pinItem);
        }
      }
    }
    for (var j = 0; j < getArrayByRooms.length; j++) {
      pinItem = pin.renderPin(getArrayByRooms[j], getArrayByRooms);
      pinItem.setAttribute('data-pin-number', j);
      map.fragment.appendChild(pinItem);
    }
    map.similarPinList.appendChild(map.fragment);
  });
})();

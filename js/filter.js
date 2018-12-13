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
    updateCards();
  });

  // Фильтруем по комнатам
  roomsFilter.addEventListener('change', function () {
    updateCards();
  });

  var updateCards = function () {

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

    var selectedTypeIndex = typeFilter.options[typeFilter.selectedIndex];
    var selectedRoomsIndex = roomsFilter.options[roomsFilter.selectedIndex];

    // Фильтруем массив по типу
    var getArrayByType = data.ads.filter(function (it) {
      return it.offer.type === selectedTypeIndex.value;
    });

    // Фильтруем массив по комнатам
    var getArrayByRooms = data.ads.filter(function (it) {
      return it.offer.rooms === parseInt(selectedRoomsIndex.value, 10);
    });

    // Объединям массивы
    var fullFiltersArray = getArrayByType.concat(getArrayByRooms);
    console.log(getArrayByType);
    console.log(getArrayByRooms);
    console.log(fullFiltersArray);
    // Отрисовываем пины в соответствии с фильтрами
    var ads = data.ads;
    /*
    if (selectedTypeIndex.value === 'any') {
      var ads = data.ads;
      // Взять из map.js
      for (var i = 0; i < data.MAX_ADS; i++) {
        if (data.ads[i].offer) {
          var pinItem = pin.renderPin(ads[i], ads);
          pinItem.setAttribute('data-pin-number', i);
          map.fragment.appendChild(pinItem);
        }
      }
    } */
    for (var j = 0; j < fullFiltersArray.length; j++) {
      var pinItem = pin.renderPin(ads[j], ads);
      pinItem = pin.renderPin(fullFiltersArray[j], fullFiltersArray);
      pinItem.setAttribute('data-pin-number', j);
      map.fragment.appendChild(pinItem);
    }
    map.similarPinList.appendChild(map.fragment);
  };
})();

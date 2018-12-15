'use strict';

(function () {

  var data = window.data;
  var pin = window.pin;
  var map = window.map;
  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var roomsFilter = filters.querySelector('#housing-rooms');
  var priceFilter = filters.querySelector('#housing-price');
  var featuresFilter = filters.querySelector('#housing-features');
  var featuresFilters = featuresFilter.querySelectorAll('input');

  filters.addEventListener('change', function () {
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

    var filter = function (el) {
      var type = true;
      var rooms = true;
      var price = true;
      var features = true;
      var selectedTypeIndex = typeFilter.options[typeFilter.selectedIndex];
      var selectedRoomsIndex = roomsFilter.options[roomsFilter.selectedIndex];
      var selectedPriceIndex = priceFilter.options[priceFilter.selectedIndex];

      if (selectedTypeIndex.value !== 'any') {
        type = el.offer.type === selectedTypeIndex.value;
      }
      if (selectedRoomsIndex.value !== 'any') {
        rooms = el.offer.rooms === parseInt(selectedRoomsIndex.value, 10);
      }
      if (selectedPriceIndex.value !== 'any') {
        switch (selectedPriceIndex.value) {
          case 'low':
            price = el.offer.price < 10000;
            break;
          case 'middle':
            price = el.offer.price >= 10000 && el.offer.price < 50000;
            break;
          case 'high':
            price = el.offer.price >= 50000;
            break;
        }
      }
      /*
      featuresFilters.forEach(function (feature) {
        if (feature.checked) {
          features = el.offer.features === feature.value;
        }
        return features;
      });
      console.log(features);
      */
      return type && rooms && price;
    };

    var filteredArray = data.ads.filter(filter);
    for (var i = 0; i < filteredArray.length; i++) {
      var pinItem = pin.renderPin(filteredArray[i], filteredArray);
      pinItem.setAttribute('data-pin-number', i);
      map.fragment.appendChild(pinItem);
    }
    map.similarPinList.appendChild(map.fragment);
  };
})();

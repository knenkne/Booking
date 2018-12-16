'use strict';

(function () {

  var data = window.data;
  var card = window.card;
  var pin = window.pin;
  var map = window.map;
  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var roomsFilter = filters.querySelector('#housing-rooms');
  var priceFilter = filters.querySelector('#housing-price');
  var guestsFilter = filters.querySelector('#housing-guests');
  var featuresFilterList = filters.querySelector('#housing-features');

  filters.addEventListener('change', function () {
    window.setTimeout(function () {
      updateCards();
    }, 500);
  });

  var updateCards = function () {
    // Удаляем пины
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.remove();
    });

    card.removePopup();

    var filter = function (el) {
      var type = true;
      var rooms = true;
      var price = true;
      var guests = true;
      var features = true;
      var featuresFilters = featuresFilterList.querySelectorAll('input:checked');
      var selectedTypeIndex = typeFilter.options[typeFilter.selectedIndex];
      var selectedRoomsIndex = roomsFilter.options[roomsFilter.selectedIndex];
      var selectedPriceIndex = priceFilter.options[priceFilter.selectedIndex];
      var selectedGuestsIndex = guestsFilter.options[guestsFilter.selectedIndex];

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
      if (selectedGuestsIndex.value !== 'any') {
        guests = el.offer.guests === parseInt(selectedGuestsIndex.value, 10);
      }

      var successFlag = true;
      featuresFilters.forEach(function (feature) {
        if (el.offer.features.indexOf(feature.value) === -1) {
          successFlag = false;
        }
      });
      features = successFlag;

      return type && rooms && price && guests && features;
    };

    var filteredArray = data.ads.filter(filter);
    for (var i = 0; i < filteredArray.length && i < data.MAX_ADS; i++) {
      var pinItem = pin.renderPin(filteredArray[i], filteredArray);
      pinItem.setAttribute('data-pin-number', i);
      map.fragment.appendChild(pinItem);
    }
    map.similarPinList.appendChild(map.fragment);
  };
})();

'use strict';

(function () {

  var data = window.data;
  var card = window.card;
  var pin = window.pin;
  var map = window.map;
  var debounce = window.debounce.debounce;
  var filters = document.querySelector('.map__filters');
  var typeFilter = filters.querySelector('#housing-type');
  var roomsFilter = filters.querySelector('#housing-rooms');
  var priceFilter = filters.querySelector('#housing-price');
  var guestsFilter = filters.querySelector('#housing-guests');
  var featuresFilterList = filters.querySelector('#housing-features');

  filters.addEventListener('change', function () {
    debounce(updateCards);
  });

  var updateCards = function () {
    // Удаляем пины
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.remove();
    });

    card.removePopup();

    var filter = function (el) {
      var istypeCorrect = true;
      var isRoomsCorrect = true;
      var isPriceCorrect = true;
      var isGuestsCorrect = true;
      var isFeaturesCorrect = true;
      var featuresFilters = featuresFilterList.querySelectorAll('input:checked');
      var selectedTypeIndex = typeFilter.options[typeFilter.selectedIndex];
      var selectedRoomsIndex = roomsFilter.options[roomsFilter.selectedIndex];
      var selectedPriceIndex = priceFilter.options[priceFilter.selectedIndex];
      var selectedGuestsIndex = guestsFilter.options[guestsFilter.selectedIndex];

      if (selectedTypeIndex.value !== 'any') {
        istypeCorrect = el.offer.type === selectedTypeIndex.value;
      }
      if (selectedRoomsIndex.value !== 'any') {
        isRoomsCorrect = el.offer.rooms === parseInt(selectedRoomsIndex.value, 10);
      }
      if (selectedPriceIndex.value !== 'any') {
        switch (selectedPriceIndex.value) {
          case 'low':
            isPriceCorrect = el.offer.price < 10000;
            break;
          case 'middle':
            isPriceCorrect = el.offer.price >= 10000 && el.offer.price < 50000;
            break;
          case 'high':
            isPriceCorrect = el.offer.price >= 50000;
            break;
        }
      }
      if (selectedGuestsIndex.value !== 'any') {
        isGuestsCorrect = el.offer.guests === parseInt(selectedGuestsIndex.value, 10);
      }

      featuresFilters.forEach(function (feature) {
        if (el.offer.features.indexOf(feature.value) === -1) {
          isFeaturesCorrect = false;
        }
      });

      return istypeCorrect && isRoomsCorrect && isPriceCorrect && isGuestsCorrect && isFeaturesCorrect;
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

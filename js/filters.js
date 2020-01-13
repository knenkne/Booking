'use strict';

(function () {
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var removeCard = window.card.remove;

  var MAX_OFFERS = 5;
  var HOUSE_PRICE = {
    'low': 10000,
    'high': 50000
  };

  var filters = document.querySelector('.map__filters');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var featuresList = filters.querySelector('#housing-features');

  function toggleFilters() {
    filters.reset();
    filters.childNodes.forEach(function (field) {
      field.disabled = !field.disabled;
    });
  }

  function filterOffer(offer) {
    var isCorrectType = true;
    var isCorrectPrice = true;
    var isCorrectRooms = true;
    var isCorrectGuests = true;
    var isCorrectFeatures = true;

    var features = featuresList.querySelectorAll('input:checked');

    if (typeSelect.value !== 'any') {
      isCorrectType = typeSelect.value === offer.offer.type;
    }

    if (priceSelect.value !== 'any') {
      switch (priceSelect.value) {
        case 'low':
          isCorrectPrice = offer.offer.price < HOUSE_PRICE.low;
          break;
        case 'middle':
          isCorrectPrice = offer.offer.price >= HOUSE_PRICE.low && offer.offer.price < HOUSE_PRICE.high;
          break;
        case 'high':
          isCorrectPrice = offer.offer.price >= HOUSE_PRICE.high;
          break;
      }
    }

    if (roomsSelect.value !== 'any') {
      isCorrectRooms = parseInt(roomsSelect.value, 10) === offer.offer.rooms;
    }

    if (guestsSelect.value !== 'any') {
      isCorrectGuests = parseInt(guestsSelect.value, 10) === offer.offer.guests;
    }

    features.forEach(function (feature) {
      if (offer.offer.features.indexOf(feature.value) === -1) {
        isCorrectFeatures = false;
        return;
      }
    });

    return isCorrectType && isCorrectPrice && isCorrectRooms && isCorrectGuests && isCorrectFeatures;
  }


  function onFiltersChange() {
    var offers = window.offers.filter(filterOffer);

    // Removing old pins & card
    removeCard();
    removePins();
    renderPins(offers.slice(0, MAX_OFFERS));
  }

  filters.addEventListener('change', onFiltersChange);

  window.filters = {
    toggle: toggleFilters
  };

}());

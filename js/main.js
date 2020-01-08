'use strict';

var createOffers = window.data.createOffers;
var renderPins = window.pin.render;

var MAX_OFFERS = 8;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');

//
// MAIN PIN //
//

// Activating page
function onMainPinClick() {
  // Removing disabled state
  map.classList.remove('map--faded');

  // Creating offers
  var offers = createOffers(MAX_OFFERS);

  // Rendering pins
  renderPins(offers, pinsContainer);

  mainPin.removeEventListener('mousedown', onMainPinClick);
}

mainPin.addEventListener('mousedown', onMainPinClick);



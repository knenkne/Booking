'use strict';

var getOffers = window.data.get;
var renderPins = window.pin.render;
var form = window.adForm.element;
var toggleForm = window.adForm.toggle;
var removeCard = window.card.remove;
var onMouseDownDragPin = window.drag;

var MAX_OFFERS = 5;
var DATA_URL = 'https://js.dump.academy/keksobooking/data';

var mainContainer = document.querySelector('main');
var map = mainContainer.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');

window.offers = [];

//
// MAIN PIN //
//

var onError = function (message) {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__message').textContent = message;
  errorElement.querySelector('.error__button').addEventListener('click', function () {
    errorElement.remove();
    getOffers(DATA_URL, onSuccess, onError);
  });

  mainContainer.appendChild(errorElement);
};

var onSuccess = function (data) {
  window.offers = data;
  renderPins(window.offers.slice(0, MAX_OFFERS), pinsContainer);
};

// Activating page
function onMouseDownActivatePage() {
  // Removing disabled state
  map.classList.remove('map--faded');

  // Creating offers
  getOffers(DATA_URL, onSuccess, onError);

  // Enabling form
  toggleForm();

  mainPin.removeEventListener('mousedown', onMouseDownActivatePage);
}

// Deactivating page
function onFormResetDeactivatePage() {
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

  // Removing pins
  pins.forEach(function (pin) {
    pin.remove();
  });

  // Setting default position for mainPin
  mainPin.style.left = '570px';
  mainPin.style.top = '375px';
  map.classList.add('map--faded');

  // Removing opened card
  removeCard();

  mainPin.addEventListener('mousedown', onMouseDownActivatePage);
}

mainPin.addEventListener('mousedown', onMouseDownActivatePage);
mainPin.addEventListener('mousedown', onMouseDownDragPin);
form.addEventListener('reset', onFormResetDeactivatePage);

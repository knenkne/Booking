'use strict';

var getOffers = window.data.get;
var renderPins = window.pin.render;
var enableForm = window.form.enable;
var onMouseDownDragPin = window.drag;

var MAX_OFFERS = 5;
var DATA_URL = 'https://js.dump.academy/keksobooking/data';

var mainContainer = document.querySelector('main');
var map = mainContainer.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');

var offers = [];

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
  offers = data;
  renderPins(offers.slice(0, MAX_OFFERS), pinsContainer);
};

// Activating page
function onMouseDownActivatePage() {
  // Removing disabled state
  map.classList.remove('map--faded');

  // Creating offers
  getOffers(DATA_URL, onSuccess, onError);

  // Enabling form
  enableForm();

  mainPin.removeEventListener('mousedown', onMouseDownActivatePage);
}

mainPin.addEventListener('mousedown', onMouseDownActivatePage);
mainPin.addEventListener('mousedown', onMouseDownDragPin);

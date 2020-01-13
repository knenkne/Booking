'use strict';

var getOffers = window.data.get;
var renderPins = window.pin.render;
var removePins = window.pin.remove;
var form = window.adForm.element;
var toggleForm = window.adForm.toggle;
var toggleFilters = window.filters.toggle;
var removeCard = window.card.remove;
var onMouseDownDragPin = window.drag;

var MAX_OFFERS = 5;
var DATA_URL = 'https://js.dump.academy/keksobooking/data';

var mainContainer = document.querySelector('main');
var map = mainContainer.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');

window.offers = [];

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
  renderPins(window.offers.slice(0, MAX_OFFERS));

  // Enabling form & filters
  toggleForm();
  toggleFilters();
};

// Activating page
function onMouseDownActivatePage() {
  // Removing disabled state
  map.classList.remove('map--faded');

  // Creating offers
  getOffers(DATA_URL, onSuccess, onError);

  mainPin.removeEventListener('mousedown', onMouseDownActivatePage);
  mainPin.removeEventListener('keydown', onKeyPressActivatePage);
}

function onKeyPressActivatePage(e) {
  if (e.key === 'Enter') {
    onMouseDownActivatePage();
  }
}

// Deactivating page
function onFormResetDeactivatePage() {
  // Setting default position for mainPin
  mainPin.style.left = '570px';
  mainPin.style.top = '375px';
  map.classList.add('map--faded');

  // Removing opened card & pins & disabling filters
  removePins();
  removeCard();
  toggleFilters();

  mainPin.addEventListener('mousedown', onMouseDownActivatePage);
}

mainPin.addEventListener('keydown', onKeyPressActivatePage);
mainPin.addEventListener('mousedown', onMouseDownActivatePage);
mainPin.addEventListener('mousedown', onMouseDownDragPin);
form.addEventListener('reset', onFormResetDeactivatePage);

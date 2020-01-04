'use strict';

var MAX_OFFERS = 8;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');
var filtersContainer = map.querySelector('.map__filters-container');

var titles = ['Hello', 'Oh, Here We go Again', 'Amazing Apps'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['None', 'ASAP Need $$$', 'Comfortable Apps'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var price = {
  'min': 100,
  'max': 1000
};

var coords = {
  x: {
    'min': 0,
    'max': map.offsetWidth
  },
  y: {
    'min': 130,
    'max': 630
  }
};


var typesMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (1 + min - max)) + max;
}

function createOffer(id) {
  return {
    'author': {
      'avatar': id < 10 ? 'img/avatars/user0' + id + '.png' : 'img/avatars/user' + id + '.png'
    },
    'offer': {
      'title': getRandomItem(titles),
      'address': getRandomNumber(0, 500) + ', ' + getRandomNumber(0, 500),
      'price': getRandomNumber(price.min, price.max),
      'type': getRandomItem(types),
      'rooms': getRandomNumber(0, 10),
      'guests': getRandomNumber(0, 10),
      'checkin': getRandomItem(checks),
      'checkout': getRandomItem(checks),
      'features': features,
      'description': getRandomItem(descriptions),
      'photos': photos
    },
    'location': {
      'x': getRandomNumber(coords.x.min, coords.x.max),
      'y': getRandomNumber(coords.y.min, coords.y.max)
    }
  };
}

function createOffers(amount) {
  var offers = [];
  for (var i = 1; i <= amount; i++) {
    var offer = createOffer(i);
    offers.push(offer);
  }

  return offers;
}

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


//
//    PINS   //
//

// Creating single pin element
function createPin(offer) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = offer.location.x + 'px';
  pinElement.style.top = offer.location.y + 'px';

  pinElement.querySelector('img').setAttribute('src', offer.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', offer.offer.title);

  pinElement.addEventListener('click', function () {
    onPinClick(offer);
  });

  return pinElement;
}

// Rendering all pins by offers data
function renderPins(offers, container) {
  var fragment = document.createDocumentFragment();

  // Creating single pin by offer data and appending it to fragment
  offers.forEach(function (offer) {
    var pin = createPin(offer);
    fragment.appendChild(pin);
  });

  // Appending fragment with all the pins to container
  container.appendChild(fragment);
}

function onPinClick(offer) {
  // Deleting previous card
  var cardElement = map.querySelector('.map__card');

  if (cardElement) {
    cardElement.remove();
  }

  // Creating new card
  cardElement = createCard(offer);
  map.insertBefore(cardElement, filtersContainer);
}


//
//    CARDS   //
//

function createPhoto(src) {
  var photoElement = document.createElement('img');
  photoElement.setAttribute('src', src);
  photoElement.setAttribute('alt', 'Фотография жилья');
  photoElement.setAttribute('width', 45);
  photoElement.setAttribute('height', 40);
  photoElement.classList.add('popup__photo');

  return photoElement;
}

function createFeature(name) {
  var featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature', 'popup__feature--' + name);

  return featureElement;
}

function createCard(offer) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var photosContainer = cardElement.querySelector('.popup__photos');
  var featuresContainer = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesMap[offer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ' , выезд до ' + offer.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.offer.description;

  // Appending photos
  photosContainer.innerHTML = '';
  offer.offer.photos.forEach(function (src) {
    var photoElement = createPhoto(src);
    photosContainer.appendChild(photoElement);
  });

  // Appending features
  featuresContainer.innerHTML = '';
  offer.offer.features.forEach(function (name) {
    var featureElement = createFeature(name);
    featuresContainer.appendChild(featureElement);
  });

  cardElement.addEventListener('click', function () {
    cardElement.remove();
  });


  return cardElement;
}

mainPin.addEventListener('mousedown', onMainPinClick);

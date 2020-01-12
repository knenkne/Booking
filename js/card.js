'use strict';

(function () {
  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

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

  function onCloseButtonClick() {
    // Removing pin active state for current offer
    var cardElement = document.querySelector('.map__card');
    var pinElement = document.querySelector('.map__pin--active');

    pinElement.classList.remove('map__pin--active');

    cardElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
  }

  function onEscButtonPress(e) {
    if (e.key === 'Escape') {
      onCloseButtonClick();
    }
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

    cardElement.addEventListener('click', onCloseButtonClick);

    document.addEventListener('keydown', onEscButtonPress);


    return cardElement;
  }

  window.card = {
    create: createCard
  };

}());

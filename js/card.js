'use strict';

(function () {

  var data = window.data;
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Генерируем фотографию
  var generatePhoto = function () {
    var newPhoto = document.createElement('img');
    newPhoto.className = 'popup__photo';
    newPhoto.width = '45';
    newPhoto.height = '40';
    newPhoto.alt = 'Фотография жилья';
    return newPhoto;
  };

  // Генерируем удобства
  var generateFeature = function (feature) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + feature;
    return newFeature;
  };

  // Скрываем карточку
  var removePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    var activePinElements = document.querySelectorAll('.map__pin--active');
    activePinElements.forEach(function (activatePinElement) {
      activatePinElement.classList.remove('map__pin--active');
    });
  };

  var renderPhotos = function (element, ad) {
    var photos = element.querySelector('.popup__photos');
    var photo = element.querySelector('.popup__photo');
    if (ad.offer.photos.length !== 0) {
      // Удаляем старое фото и добавляем новые
      photos.removeChild(photo);
      ad.offer.photos.forEach(function (photoElement) {
        var newPhoto = generatePhoto();
        newPhoto.src = photoElement;
        photos.appendChild(newPhoto);
      });
    } else {
      photos.remove();
    }
  };

  var renderFeatures = function (element, ad) {
    var features = element.querySelector('.popup__features');
    if (ad.offer.features.length !== 0) {
      // Удаляем старые фичи и добавляем новые
      while (features.firstChild) {
        features.removeChild(features.firstChild);
      }
      ad.offer.features.forEach(function (feature) {
        var newFeature = generateFeature(feature);
        features.appendChild(newFeature);
      });
    } else {
      features.remove();
    }
  };

  // Генерируем карточку
  var renderCard = function (ad) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = data.HOUSE_TYPE[ad.offer.type.toUpperCase()].name;
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    renderPhotos(cardElement, ad);
    renderFeatures(cardElement, ad);
    // Закрываем объявление на крестик и ESC
    var cardElementCloseHandler = cardElement.querySelector('.popup__close');
    cardElementCloseHandler.setAttribute('tabindex', 0);
    cardElementCloseHandler.addEventListener('click', function () {
      removePopup();
    });
    cardElementCloseHandler.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.KEYCODES.ENTER) {
        removePopup();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.KEYCODES.ESC) {
        removePopup();
      }
    });
    return cardElement;
  };

  window.card = {
    renderCard: renderCard,
    removePopup: removePopup
  };
})();

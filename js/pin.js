'use strict';

(function () {
  var createCard = window.card.create;

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');

  function createPin(offer, index) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = offer.location.x + 'px';
    pinElement.style.top = offer.location.y + 'px';

    pinElement.querySelector('img').setAttribute('src', offer.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', offer.offer.title);

    pinElement.setAttribute('data-index', index);

    pinElement.addEventListener('click', function (e) {
      onPinClick(e, offer);
    });

    return pinElement;
  }

  // Rendering all pins by offers data
  function renderPins(offers, container) {
    var fragment = document.createDocumentFragment();

    // Creating single pin by offer data and appending it to fragment
    offers.forEach(function (offer, index) {
      var pinElement = createPin(offer, index);
      fragment.appendChild(pinElement);
    });

    // Appending fragment with all the pins to container
    container.appendChild(fragment);
  }

  function removePinActiveState(pinElement) {
    pinElement.classList.remove('map__pin--active');
  }

  function onPinClick(e, offer) {
    var pinElement = e.currentTarget;
    var pinElements = map.querySelectorAll('.map__pin');
    var cardElement = map.querySelector('.map__card');

    // Toggle active state
    pinElements.forEach(removePinActiveState);
    pinElement.classList.add('map__pin--active');

    // Deleting previous card
    if (cardElement) {
      cardElement.remove();
    }

    // Creating new card
    cardElement = createCard(offer);
    map.insertBefore(cardElement, filtersContainer);
  }

  window.pin = {
    render: renderPins
  };

}());

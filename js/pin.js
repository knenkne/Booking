'use strict';

(function () {

  var similarCardList = document.querySelector('.map__filters-container');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Генерируем метку
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.querySelector('img').src = ad.author.avatar;

    // Отрисовываем объявление в соответствии с пином
    pinElement.addEventListener('click', function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      var card = window.card.renderCard(window.data.ads[pinElement.getAttribute('data-pin-number')]);
      window.map.map.insertBefore(card, similarCardList);
    });

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
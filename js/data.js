'use strict';

(function () {
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
      'max': 750
    },
    y: {
      'min': 130,
      'max': 630
    }
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

  window.data = {
    createOffers: createOffers
  };

}());

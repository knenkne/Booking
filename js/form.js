'use strict';

(function () {
  var typesPriceMap = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var form = document.querySelector('.ad-form');
  var typeSelect = form.querySelector('#type');
  var roomsSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var priceField = form.querySelector('#price');

  function enableForm() {
    var fields = form.querySelectorAll('fieldset');

    form.classList.remove('ad-form--disabled');
    fields.forEach(function (field) {
      field.disabled = false;
    });
  }

  function onTypeChange(e) {
    priceField.placeholder = typesPriceMap[e.target.value];
    priceField.min = typesPriceMap[e.target.value];
  }

  function onRoomsChange(e) {
    // roomsIndex === capacityIndex or less to enable & select
    var roomsIndex = e.target.selectedIndex;
    capacitySelect.options[roomsIndex].selected = true;

    for (var i = 0; i < capacitySelect.options.length; i++) {
      // Disabling all options and enabling which needed
      capacitySelect.options[i].disabled = true;

      // Enabling the same value for capacity or less && excluding last choice
      if (roomsIndex === capacitySelect.options.length - 1) {
        capacitySelect.options[roomsIndex].disabled = false;
      } else if (roomsIndex >= i) {
        capacitySelect.options[i].disabled = false;
      }
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
  }

  roomsSelect.addEventListener('change', onRoomsChange);
  typeSelect.addEventListener('change', onTypeChange);
  form.addEventListener('submit', onFormSubmit);

  window.form = {
    enable: enableForm
  };

}());

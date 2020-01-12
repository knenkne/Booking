'use strict';

(function () {
  var typesPriceMap = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('fieldset');
  var typeSelect = form.querySelector('#type');
  var roomsSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var checkinSelect = form.querySelector('#timein');
  var checkoutSelect = form.querySelector('#timeout');
  var priceField = form.querySelector('#price');

  function toggleForm() {
    form.classList.toggle('ad-form--disabled');
    fields.forEach(function (field) {
      field.disabled = !field.disabled;
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

  function onCheckChange(e) {
    var selectedIndex = e.target.selectedIndex;

    if (e.target === checkinSelect) {
      checkoutSelect.options[selectedIndex].selected = true;
    } else {
      checkinSelect.options[selectedIndex].selected = true;
    }
  }

  function onFormReset() {
    var defaultType = typeSelect.querySelector('option[selected]').value;

    // Change type & price UI additionaly to default reset
    priceField.placeholder = typesPriceMap[defaultType];
    priceField.min = typesPriceMap[defaultType];

    // Disabling form
    toggleForm();
  }

  function onFormSubmit(e) {
    // e.preventDefault();
  }

  roomsSelect.addEventListener('change', onRoomsChange);
  typeSelect.addEventListener('change', onTypeChange);
  checkinSelect.addEventListener('change', onCheckChange);
  checkoutSelect.addEventListener('change', onCheckChange);

  form.addEventListener('reset', onFormReset);
  form.addEventListener('submit', onFormSubmit);

  window.adForm = {
    toggle: toggleForm,
    element: form
  };

}());

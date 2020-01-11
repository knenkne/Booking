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

  function onFormSubmit(e) {
    e.preventDefault();
  }

  typeSelect.addEventListener('change', onTypeChange);
  form.addEventListener('submit', onFormSubmit);

  window.form = {
    enable: enableForm
  };

}());

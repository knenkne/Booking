'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var ESC = window.data.KeyCodes.ESC;
  var TIMEOUT = window.data.XHR_TIMEOUT;
  var OK = window.data.StatusCodes.OK;

  var sendXhr = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
  var load = function (onLoad, onError) {
    sendXhr(onLoad, onError, 'GET', LOAD_URL);
  };

  var upload = function (formData, onLoad, onError) {
    sendXhr(onLoad, onError, 'POST', UPLOAD_URL, formData);
  };

  var onLoadError = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    var errorClose = function () {
      errorElement.remove();
    };
    errorButton.addEventListener('click', errorClose);
    document.addEventListener('click', errorClose);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        errorClose();
      }
    });
    errorMessage.textContent = message;
    main.insertAdjacentElement('afterbegin', errorElement);
  };

  window.backend = {
    onLoadError: onLoadError,
    load: load,
    upload: upload
  };
})();

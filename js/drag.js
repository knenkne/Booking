'use strict';
(function () {
  var PIN_TIP_HEIGHT = 22;
  var DRAG_LIMIT = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  function setAddress() {
    var leftOffset = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var topOffest = mainPin.offsetTop + mainPin.offsetHeight + PIN_TIP_HEIGHT;

    addressField.value = leftOffset + ', ' + topOffest;
  }

  function onMouseDownDragPin(e) {
    e.preventDefault();
    setAddress();

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var onMouseMove = function (moveE) {
      moveE.preventDefault();
      setAddress();

      var shift = {
        x: startCoords.x - moveE.clientX,
        y: startCoords.y - moveE.clientY
      };

      startCoords = {
        x: moveE.clientX,
        y: moveE.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      // X limit
      if (mainPin.offsetLeft > DRAG_LIMIT.x.max - mainPin.offsetWidth / 2) {
        mainPin.style.left = DRAG_LIMIT.x.max - mainPin.offsetWidth / 2 + 'px';
      } else if (mainPin.offsetLeft < DRAG_LIMIT.x.min - mainPin.offsetWidth / 2) {
        mainPin.style.left = DRAG_LIMIT.x.min - mainPin.offsetWidth / 2 + 'px';
      }

      // Y limit
      if (mainPin.offsetTop > DRAG_LIMIT.y.max - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
        mainPin.style.top = DRAG_LIMIT.y.max - mainPin.offsetHeight - PIN_TIP_HEIGHT + 'px';
      } else if (mainPin.offsetTop < DRAG_LIMIT.y.min - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
        mainPin.style.top = DRAG_LIMIT.y.min - mainPin.offsetHeight - PIN_TIP_HEIGHT + 'px';
      }
    };

    var onMouseUp = function (upE) {
      upE.preventDefault();
      setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.drag = onMouseDownDragPin;

}());

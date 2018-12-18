'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');
  var previewImage = document.querySelector('.ad-form-header__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.style.padding = '0';
        previewImage.height = '70';
        previewImage.width = '70';
        previewImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var resetAvatar = function () {
    preview.style.padding = '0 15px';
    previewImage.height = '44';
    previewImage.width = '40';
    previewImage.src = 'img/muffin-grey.svg';
  };

  window.avatar = {
    resetAvatar: resetAvatar
  };

})();

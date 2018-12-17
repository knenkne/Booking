'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewBlock = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var image = document.createElement('img');
  previewBlock.appendChild(image);

  fileChooser.addEventListener('change', function () {
    var files = fileChooser.files;

    var uploadImage = function (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var previewBlockClone = previewBlock.cloneNode(true);
          var cloneImage = previewBlockClone.querySelector('img');
          cloneImage.width = '70';
          cloneImage.height = '70';
          cloneImage.src = reader.result;
          photoContainer.appendChild(previewBlockClone);
        });
        reader.readAsDataURL(file);
      }
    };

    for (var i = 0; i < files.length; i++) {
      uploadImage(files[i]);
    }

    previewBlock.remove();
  });
})();

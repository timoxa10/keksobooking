'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileMapChooser = document.querySelector('.ad-form-header__input');
  var mapPreview = document.querySelector('.ad-form-header__preview img');

  var fileHousingChooser = document.querySelector('.ad-form__input');
  var housingPreview = document.querySelector('.ad-form__photo');

  var uploadHousingImage = function () {
    var file = fileHousingChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var imageContainer = document.createElement('img');
        imageContainer.setAttribute('src', housingPreview.src = reader.result);
        imageContainer.setAttribute('width', '70');
        imageContainer.setAttribute('height', '70');
        housingPreview.appendChild(imageContainer);
      });
      reader.readAsDataURL(file);
    }
  };

  var uploadMapImage = function () {
    var file = fileMapChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        mapPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var fileHousingChooserChangeHandler = function () {
    uploadHousingImage();
  };

  var fileMapChooserChangeHandler = function () {
    uploadMapImage();
  };

  fileHousingChooser.addEventListener('change', fileHousingChooserChangeHandler);
  fileMapChooser.addEventListener('change', fileMapChooserChangeHandler);
})();

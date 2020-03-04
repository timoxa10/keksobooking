'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileMapChooser = document.querySelector('.ad-form-header__input');
  var mapPreview = document.querySelector('.ad-form-header__preview img');
  var fileHousingChooser = document.querySelector('.ad-form__input');
  var housingPreview = document.querySelector('.ad-form__photo');
  var housingPreviews = document.querySelectorAll('.ad-form__photo');
  var addClass = window.util.addClass;

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
        if (housingPreview.children.length >= 2) {
          for (var i = 1; i < housingPreview.children.length; i++) {
            var housingPreviewClone = document.createElement('div');
            addClass(housingPreviewClone, 'ad-form__photo');
            housingPreviewClone.appendChild(housingPreview.children[i]);
            housingPreview.insertAdjacentElement('afterend', housingPreviewClone);
          }
        }
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

  var resetMapPreview = function () {
    mapPreview.setAttribute('src', 'img/muffin-grey.svg');
    mapPreview.setAttribute('width', '40');
    mapPreview.setAttribute('height', '44');
    mapPreview.setAttribute('alt', 'Аватар пользователя');
  };

  var resetHousingPreview = function () {
    housingPreviews[0].firstElementChild.remove();
    if (housingPreviews.length >= 2) {
      for (var i = 1; i < housingPreviews.length; i++) {
        housingPreviews[i].remove();
      }
    }
  };

  fileHousingChooser.addEventListener('change', fileHousingChooserChangeHandler);
  fileMapChooser.addEventListener('change', fileMapChooserChangeHandler);

  window.avatar = {
    resetMapPreview: resetMapPreview,
    resetHousingPreview: resetHousingPreview
  };
})();

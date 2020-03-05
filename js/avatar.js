'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileMapChooser = document.querySelector('.ad-form-header__input');
  var mapPreview = document.querySelector('.ad-form-header__preview img');
  var fileHousingChooser = document.querySelector('.ad-form__input');
  var housingPreview = document.querySelector('.ad-form__photo');
  var inputUpload = document.querySelector('.ad-form__upload');
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
        housingPreview.remove();
        var imageNode = document.createElement('img');
        var divNode = document.createElement('div');
        addClass(divNode, 'ad-form__photo');
        imageNode.setAttribute('src', divNode.src = reader.result);
        imageNode.setAttribute('width', '70');
        imageNode.setAttribute('height', '70');
        divNode.appendChild(imageNode);
        inputUpload.insertAdjacentElement('afterend', divNode);
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
    var housingPreviews = document.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < housingPreviews.length; i++) {
      housingPreviews[i].remove();
    }
    var divNode = document.createElement('div');
    addClass(divNode, 'ad-form__photo');
    inputUpload.insertAdjacentElement('afterend', divNode);
  };

  fileHousingChooser.addEventListener('change', fileHousingChooserChangeHandler);
  fileMapChooser.addEventListener('change', fileMapChooserChangeHandler);

  window.avatar = {
    resetMapPreview: resetMapPreview,
    resetHousingPreview: resetHousingPreview
  };
})();

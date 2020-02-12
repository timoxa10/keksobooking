'use strict';

(function () {
  var INACTIVE_MAIN_PIN_WIDTH = 65;
  var INACTIVE_MAIN_PIN_HEIGHT = 65;
  var ACTIVE_MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;
  var MIN_TITLE_LENGTH = 30;
  var HOUSING_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var headlineField = adForm.querySelector('#title');
  var pricePerNightField = adForm.querySelector('#price');
  var checkinField = adForm.querySelector('#timein');
  var checkoutField = adForm.querySelector('#timeout');
  var roomsField = adForm.querySelector('#room_number');
  var guestsField = adForm.querySelector('#capacity');
  var typeOfHousingField = adForm.querySelector('#type');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersSelectLists = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var roomsCapacityMap = {
    '1': {
      'guests': ['1'],
      'errorText': '1 комната для 1 гостя'
    },
    '2': {
      'guests': ['1', '2'],
      'errorText': '2 комнаты для 1 или 2 гостей'
    },
    '3': {
      'guests': ['1', '2', '3'],
      'errorText': '3 комнаты для 1, 2 или 3 гостей'
    },
    '100': {
      'guests': ['0'],
      'errorText': '100 комнат не для гостей'
    },
  };
  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    addressField: addressField,
    headlineField: headlineField,
    pricePerNightField: pricePerNightField,
    checkinField: checkinField,
    checkoutField: checkoutField,
    roomsField: roomsField,
    guestsField: guestsField,
    typeOfHousingField: typeOfHousingField,
    mapFilters: mapFilters,
    mapFiltersSelectLists: mapFiltersSelectLists,
    mapFiltersFieldset: mapFiltersFieldset,
    setInactiveFieldsState: function (elements) {
      return elements.forEach(function (item) {
        item.setAttribute('disabled', '');
      });
    },
    setActiveFieldsState: function (elements) {
      return elements.forEach(function (item) {
        item.removeAttribute('disabled', '');
      });
    },
    getMapPinMainDefaultCoords: function () {
      var coordinates = {
        left: Math.floor(parseInt(window.variableUtil.mapPinMain.style.left, 10) + (INACTIVE_MAIN_PIN_WIDTH / 2)),
        top: Math.floor(parseInt(window.variableUtil.mapPinMain.style.top, 10) + (INACTIVE_MAIN_PIN_HEIGHT / 2))
      };
      return addressField.setAttribute('value', coordinates.left + ', ' + coordinates.top);
    },
    getMapPinMainActivatedCoords: function () {
      var coordinates = {
        left: Math.floor(parseInt(window.variableUtil.mapPinMain.style.left, 10) + (ACTIVE_MAIN_PIN_WIDTH / 2)),
        top: Math.floor(parseInt(window.variableUtil.mapPinMain.style.top, 10) + ACTIVE_MAIN_PIN_HEIGHT)
      };
      return addressField.setAttribute('value', coordinates.left + ', ' + coordinates.top);
    },
    validateTitle: function () {
      if (headlineField.validity.valueMissing) {
        headlineField.setCustomValidity('Обязательное поле');
      } else if (headlineField.value.length < MIN_TITLE_LENGTH) {
        headlineField.setCustomValidity('Имя должно состоять минимум из ' + MIN_TITLE_LENGTH + ' символов');
      } else {
        headlineField.setCustomValidity('');
      }
    },
    validatePrice: function () {
      if (pricePerNightField.validity.valueMissing) {
        pricePerNightField.setCustomValidity('Обязательное поле');
      } else if (pricePerNightField.validity.rangeUnderflow) {
        pricePerNightField.setCustomValidity('Цена за ночь должна быть больше или равна ' + pricePerNightField.min + ' руб.');
      } else if (pricePerNightField.validity.rangeOverflow) {
        pricePerNightField.setCustomValidity('Цена за ночь не должна превышать ' + pricePerNightField.max + ' руб.');
      } else {
        pricePerNightField.setCustomValidity('');
      }
    },
    validateRoomsNumbers: function () {
      var rooms = roomsField.value;
      var guests = guestsField.value;
      roomsField.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
    },
    typeOfHousingFieldChangeHandler: function (evt) {
      var target = evt.target.value;
      pricePerNightField.setAttribute('min', HOUSING_PRICES[target]);
      pricePerNightField.setAttribute('placeholder', HOUSING_PRICES[target]);
    },
    checkinChangeHandler: function (evt) {
      checkoutField.value = evt.target.value;
    },
    checkoutChangeHandler: function (evt) {
      checkinField.value = evt.target.value;
    }
  };
})();

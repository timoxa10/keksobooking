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
  var addressField = adForm.querySelector('#address');
  var headlineField = adForm.querySelector('#title');
  var pricePerNightField = adForm.querySelector('#price');
  var checkinField = adForm.querySelector('#timein');
  var checkoutField = adForm.querySelector('#timeout');
  var roomsField = adForm.querySelector('#room_number');
  var guestsField = adForm.querySelector('#capacity');
  var typeOfHousingField = adForm.querySelector('#type');
  var resetField = adForm.querySelector('.ad-form__reset');
  var mapPinMain = window.variableUtil.mapPinMain;
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
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersSelectLists = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addClass = window.util.addClass;
  var map = window.variableUtil.map;
  var successDataHandler = window.upload;

  var setInactiveFieldsState = function (elements) {
    return elements.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  var setActiveFieldsState = function (elements) {
    return elements.forEach(function (item) {
      item.removeAttribute('disabled', '');
    });
  };

  var getMapPinMainDefaultCoords = function () {
    var coordinates = {
      left: Math.floor(parseInt(mapPinMain.style.left, 10) + (INACTIVE_MAIN_PIN_WIDTH / 2)),
      top: Math.floor(parseInt(mapPinMain.style.top, 10) + (INACTIVE_MAIN_PIN_HEIGHT / 2))
    };
    return addressField.setAttribute('value', coordinates.left + ', ' + coordinates.top);
  };

  var getMapPinMainActivatedCoords = function () {
    var coordinates = {
      left: Math.floor(parseInt(mapPinMain.style.left, 10) + (ACTIVE_MAIN_PIN_WIDTH / 2)),
      top: Math.floor(parseInt(mapPinMain.style.top, 10) + ACTIVE_MAIN_PIN_HEIGHT)
    };
    return addressField.setAttribute('value', coordinates.left + ', ' + coordinates.top);
  };

  var validateTitle = function () {
    if (headlineField.validity.valueMissing) {
      headlineField.setCustomValidity('Обязательное поле');
    } else if (headlineField.value.length < MIN_TITLE_LENGTH) {
      headlineField.setCustomValidity('Имя должно состоять минимум из ' + MIN_TITLE_LENGTH + ' символов');
    } else {
      headlineField.setCustomValidity('');
    }
  };

  var validatePrice = function () {
    if (pricePerNightField.validity.valueMissing) {
      pricePerNightField.setCustomValidity('Обязательное поле');
    } else if (pricePerNightField.validity.rangeUnderflow) {
      pricePerNightField.setCustomValidity('Цена за ночь должна быть больше или равна ' + pricePerNightField.min + ' руб.');
    } else if (pricePerNightField.validity.rangeOverflow) {
      pricePerNightField.setCustomValidity('Цена за ночь не должна превышать ' + pricePerNightField.max + ' руб.');
    } else {
      pricePerNightField.setCustomValidity('');
    }
  };

  var validateRoomsNumbers = function () {
    var rooms = roomsField.value;
    var guests = guestsField.value;
    roomsField.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
  };

  var typeOfHousingFieldChangeHandler = function (evt) {
    var target = evt.target.value;
    pricePerNightField.setAttribute('min', HOUSING_PRICES[target]);
    pricePerNightField.setAttribute('placeholder', HOUSING_PRICES[target]);
  };

  var checkinChangeHandler = function (evt) {
    checkoutField.value = evt.target.value;
  };

  var checkoutChangeHandler = function (evt) {
    checkinField.value = evt.target.value;
  };

  validateTitle();

  validatePrice();

  validateRoomsNumbers();

  var headlineFieldInputHandler = function () {
    validateTitle();
  };

  var pricePerNightFieldInputHandler = function () {
    validatePrice();
  };

  var roomsFieldChangeHandler = function () {
    validateRoomsNumbers();
  };

  var resetForm = function (form) {
    form.reset();
  };

  var resetFieldResetHandler = function () {
    resetForm(resetField);
  };

  var mainContainer = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successNode = successTemplate.cloneNode(true);

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorNode = errorTemplate.cloneNode(true);

  var sendFormData = function (evt) {
    successDataHandler(new FormData(adForm), function () {
      resetForm(adForm);
      setInactivePageState();
      addClass(map, 'map--faded');
      addClass(adForm, 'ad-form--disabled');
      mainContainer.appendChild(successNode);
      document.addEventListener('keydown', successNodeKeydownHandler);
      document.addEventListener('click', successNodeClickHandler);
    }, errorDataHandler);
    evt.preventDefault();
  };

  var errorDataHandler = function () {
    mainContainer.appendChild(errorNode);
    document.addEventListener('keydown', errorNodeKeydownHandler);
    document.addEventListener('click', errorNodeClickHandler);
  };

  var successNodeKeydownHandler = function () {
    if (window.dialogUtil.isEscPressed) {
      addClass(successNode, 'hidden');
    }
  };

  var errorNodeKeydownHandler = function () {
    if (window.dialogUtil.isEscPressed) {
      addClass(errorNode, 'hidden');
    }
  };

  var successNodeClickHandler = function (evt) {
    var clickedArea = evt.target;
    if (clickedArea.classList.contains('success') || clickedArea.classList.contains('success__message')) {
      addClass(successNode, 'hidden');
    }
  };

  var errorNodeClickHandler = function (evt) {
    var clickedArea = evt.target;
    if (clickedArea.classList.contains('error') || clickedArea.classList.contains('error__message') || clickedArea.classList.contains('error__button')) {
      addClass(errorNode, 'hidden');
    }
  };

  var setInactivePageState = function () {
    addClass(map, 'map--faded');
    addClass(adForm, 'ad-form--disabled');
    setInactiveFieldsState(mapFiltersSelectLists);
    setInactiveFieldsState(adFormFieldsets);
    mapFiltersFieldset.setAttribute('disabled', '');
    getMapPinMainDefaultCoords();
  };

  var adFormSubmitHandler = function (evt) {
    sendFormData(evt);
  };

  headlineField.addEventListener('input', headlineFieldInputHandler);
  pricePerNightField.addEventListener('input', pricePerNightFieldInputHandler);
  roomsField.addEventListener('change', roomsFieldChangeHandler);
  guestsField.addEventListener('change', roomsFieldChangeHandler);
  checkinField.addEventListener('change', checkinChangeHandler);
  checkoutField.addEventListener('change', checkoutChangeHandler);
  typeOfHousingField.addEventListener('change', typeOfHousingFieldChangeHandler);
  resetField.addEventListener('change', resetFieldResetHandler);
  adForm.addEventListener('submit', adFormSubmitHandler);

  window.form = {
    setInactiveFieldsState: setInactiveFieldsState,
    setActiveFieldsState: setActiveFieldsState,
    getMapPinMainDefaultCoords: getMapPinMainDefaultCoords,
    getMapPinMainActivatedCoords: getMapPinMainActivatedCoords,
    validateTitle: validateTitle,
    validatePrice: validatePrice,
    validateRoomsNumbers: validateRoomsNumbers,
    typeOfHousingFieldChangeHandler: typeOfHousingFieldChangeHandler,
    checkinChangeHandler: checkinChangeHandler,
    checkoutChangeHandler: checkoutChangeHandler
  };
})();

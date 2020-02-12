'use strict';

(function () {
  window.state = {
    active: function () {
      window.util.removeClass(window.variableUtil.map, 'map--faded');
      window.util.removeClass(window.form.adForm, 'ad-form--disabled');
      window.pin.render(window.data.adsList);
      window.form.setActiveFieldsState(window.form.mapFiltersSelectLists);
      window.form.setActiveFieldsState(window.form.adFormFieldsets);
      window.form.mapFiltersFieldset.removeAttribute('disabled', '');
      window.form.getMapPinMainActivatedCoords();
      window.form.validateTitle();
      window.form.validatePrice();
      window.form.validateRoomsNumbers();
      window.form.headlineField.addEventListener('input', headlineFieldInputHandler);
      window.form.pricePerNightField.addEventListener('input', pricePerNightFieldInputHandler);
      window.form.roomsField.addEventListener('change', roomsFieldChangeHandler);
      window.form.guestsField.addEventListener('change', roomsFieldChangeHandler);
      window.form.checkinField.addEventListener('change', window.form.checkinChangeHandler);
      window.form.checkoutField.addEventListener('change', window.form.checkoutChangeHandler);
      window.form.typeOfHousingField.addEventListener('change', window.form.typeOfHousingFieldChangeHandler);
      window.variableUtil.mapPinMain.removeEventListener('keydown', enterKeydownHandler);
      window.variableUtil.mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
      window.variableUtil.mapPinsContainer.addEventListener('click', mapPinsContainerClickHandler);
    },
    default: function () {
      window.form.setInactiveFieldsState(window.form.mapFiltersSelectLists);
      window.form.setInactiveFieldsState(window.form.adFormFieldsets);
      window.form.mapFiltersFieldset.setAttribute('disabled', '');
      window.form.getMapPinMainDefaultCoords();
    }
  };

  var mapPinMainMouseDownHandler = function () {
    if (window.dialogUtil.isLeftPressed) {
      window.state.active();
    }
  };

  var enterKeydownHandler = function () {
    if (window.dialogUtil.isEnterPressed) {
      window.state.active();
    }
  };

  var headlineFieldInputHandler = function () {
    window.form.validateTitle();
  };

  var pricePerNightFieldInputHandler = function () {
    window.form.validatePrice();
  };

  var roomsFieldChangeHandler = function () {
    window.form.validateRoomsNumbers();
  };

  var mapPinsContainerClickHandler = function (evt) {
    window.card.open(evt);
  };

  var cardButtonCloseClickHandler = function () {
    window.card.close();
  };

  window.variableUtil.mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  window.variableUtil.mapPinMain.addEventListener('keydown', enterKeydownHandler);
  window.card.cardButtonClose.addEventListener('click', cardButtonCloseClickHandler);
  window.state.default();

})();

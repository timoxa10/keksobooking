'use strict';

(function () {
  var removeClass = window.util.removeClass;
  var map = window.variableUtil.map;
  var render = window.pin.render;
  var setActiveFieldsState = window.form.setActiveFieldsState;
  var setInactiveFieldsState = window.form.setInactiveFieldsState;
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersSelectLists = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var getMapPinMainActivatedCoords = window.form.getMapPinMainActivatedCoords;
  var getMapPinMainDefaultCoords = window.form.getMapPinMainDefaultCoords;
  var mapPinMain = window.variableUtil.mapPinMain;
  var mapPinsContainer = window.variableUtil.mapPinsContainer;
  var closeButton = window.card.closeButton;

  var setActivePageState = function () {
    removeClass(map, 'map--faded');
    removeClass(adForm, 'ad-form--disabled');
    render();
    setActiveFieldsState(mapFiltersSelectLists);
    setActiveFieldsState(adFormFieldsets);
    mapFiltersFieldset.removeAttribute('disabled', '');
    getMapPinMainActivatedCoords();
    mapPinMain.removeEventListener('keydown', enterKeydownHandler);
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinsContainer.addEventListener('click', mapPinsContainerClickHandler);
  };

  var setInactivePageState = function () {
    setInactiveFieldsState(mapFiltersSelectLists);
    setInactiveFieldsState(adFormFieldsets);
    mapFiltersFieldset.setAttribute('disabled', '');
    getMapPinMainDefaultCoords();
  };


  var mapPinMainMouseDownHandler = function () {
    if (window.dialogUtil.isLeftPressed) {
      setActivePageState();
    }
  };

  var enterKeydownHandler = function () {
    if (window.dialogUtil.isEnterPressed) {
      setActivePageState();
    }
  };

  var mapPinsContainerClickHandler = function (evt) {
    window.card.open(evt);
  };

  var cardButtonCloseClickHandler = function () {
    window.card.close();
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', enterKeydownHandler);
  closeButton.addEventListener('click', cardButtonCloseClickHandler);

  setInactivePageState();

  window.state = {
    isActive: setActivePageState,
    isInactive: setInactivePageState
  };
})();

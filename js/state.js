'use strict';

(function () {
  var removeClass = window.util.removeClass;
  var addClass = window.util.addClass;
  var map = window.variableUtil.map;
  var receiveData = window.data.receive;
  var setActiveFieldsState = window.form.setActiveFieldsState;
  var setInactiveFieldsState = window.form.setInactiveFieldsState;
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersSelectLists = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var getMapPinMainActivatedCoords = window.form.getMapPinMainActivatedCoords;
  var setMapPinMainDefaultCoords = window.form.setMapPinMainDefaultCoords;
  var mapPinMain = window.variableUtil.mapPinMain;
  var mapPinsContainer = window.variableUtil.mapPinsContainer;
  var closeButton = window.card.closeButton;
  var removePins = window.pin.remove;
  var resetData = window.form.resetData;
  var mapPreview = document.querySelector('.ad-form-header__preview img');

  var setActivePageState = function () {
    removeClass(map, 'map--faded');
    removeClass(adForm, 'ad-form--disabled');
    receiveData();
    setActiveFieldsState(mapFiltersSelectLists);
    setActiveFieldsState(adFormFieldsets);
    mapFiltersFieldset.removeAttribute('disabled', '');
    getMapPinMainActivatedCoords();
    mapPinMain.removeEventListener('keydown', enterKeydownHandler);
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinsContainer.addEventListener('click', mapPinsContainerClickHandler);
  };

  var setInactivePageState = function () {
    addClass(map, 'map--faded');
    addClass(adForm, 'ad-form--disabled');
    setInactiveFieldsState(mapFiltersSelectLists);
    setInactiveFieldsState(adFormFieldsets);
    mapFiltersFieldset.setAttribute('disabled', '');
    setMapPinMainDefaultCoords();
    mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.addEventListener('keydown', enterKeydownHandler);
    resetData(adForm);
    if (window.mapPins !== undefined) {
      removePins(window.mapPins);
    }
    if (!(mapPreview.src.indexOf('img/muffin-grey.svg') > -1)) {
      window.avatar.resetMapPreview();
    }
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

  closeButton.addEventListener('click', cardButtonCloseClickHandler);

  setInactivePageState();

  window.state = {
    setActive: setActivePageState,
    setInactive: setInactivePageState
  };
})();

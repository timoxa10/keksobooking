'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;

  var mapFiltersFormChangeHandler = function () {
    updatePins();
  };

  var updatePins = function () {
    window.card.close();
    removePins(window.mapPins);
    var housingType = document.querySelector('#housing-type').value;
    renderPins(window.ads.filter(function (ad) {
      if (housingType === 'any') {
        return true;
      }
      return ad.offer.type === housingType;
    }));
  };

  mapFiltersForm.addEventListener('change', mapFiltersFormChangeHandler);
})();

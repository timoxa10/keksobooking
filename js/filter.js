'use strict';

(function () {
  var housingTypeFilter = document.querySelector('#housing-type');
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;
  var housingType;

  var housingTypeChangeHandler = function (evt) {
    housingType = evt.target.value;
    updatePins(housingType);
  };

  var updatePins = function () {
    window.card.close();
    removePins(window.mapPins);
    renderPins(window.ads.filter(function (ad) {
      return ad.offer.type === housingType;
    }));
  };

  housingTypeFilter.addEventListener('change', housingTypeChangeHandler);
})();

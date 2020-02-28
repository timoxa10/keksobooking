'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var renderPins = window.pin.render;
  var removePins = window.pin.remove;

  var mapFiltersFormChangeHandler = function () {
    window.debounce.call(updatePins());
  };

  var updatePins = function () {
    window.card.close();
    removePins(window.mapPins);

    var housingType = document.querySelector('#housing-type').value;
    var housingPrice = document.querySelector('#housing-price').value;
    var housingRooms = document.querySelector('#housing-rooms').value;
    var housingGuests = document.querySelector('#housing-guests').value;
    var selectedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (checkbox) {
      return checkbox.value;
    });

    renderPins(window.ads
      .filter(function (ad) {
        if (housingType === 'any') {
          return true;
        }
        return ad.offer.type === housingType;
      })
      .filter(function (ad) {
        switch (housingPrice) {
          case 'any':
            return true;
          case 'middle':
            return ad.offer.price >= 10000 && ad.offer.price <= 50000;
          case 'low':
            return ad.offer.price <= 9999;
          default:
            return ad.offer.price >= 50001;
        }
      })
      .filter(function (ad) {
        if (housingRooms === 'any') {
          return true;
        }
        return ad.offer.rooms === Number(housingRooms);
      })
      .filter(function (ad) {
        if (housingGuests === 'any') {
          return true;
        }
        return ad.offer.guests === Number(housingGuests);
      })
      .filter(function (element) {
        return selectedFeatures.every(function (feature) {
          return element.offer.features.includes(feature);
        });
      })
    );
  };

  mapFiltersForm.addEventListener('change', mapFiltersFormChangeHandler);

  window.filter = {
    update: updatePins
  };
})();

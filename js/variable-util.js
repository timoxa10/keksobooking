'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  window.variableUtil = {
    map: map,
    mapPinsContainer: mapPinsContainer,
    mapPinMain: mapPinMain
  };
})();

'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinsContainer = window.variableUtil.mapPinsContainer;
  var map = document.querySelector('.map');

  var generateElement = function (ad, adId) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinElement.style.left = ad.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.setAttribute('id', String(adId));
    return pinElement;
  };

  var renderElements = function (elements) {
    var fragment = document.createDocumentFragment();
    elements.slice(0, 5).forEach(function (ad) {
      fragment.appendChild(generateElement(ad, ad.id));
    });
    mapPinsContainer.appendChild(fragment);
    window.mapPins = map.querySelectorAll('button[type="button"]');
  };

  var removePins = function (pins) {
    return pins.forEach(function (item) {
      item.remove();
    });
  };

  var resetActivePin = function () {
    var lastClickedPin = document.querySelector('.map__pin--active');
    if (lastClickedPin) {
      lastClickedPin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    generate: generateElement,
    render: renderElements,
    remove: removePins,
    reset: resetActivePin
  };
})();

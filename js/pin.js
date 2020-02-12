'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.pin = {
    generate: function (ad, adId) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = ad.author.avatar;
      pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
      pinElement.style.left = ad.location.x - (PIN_WIDTH / 2) + 'px';
      pinElement.setAttribute('id', String(adId));
      return pinElement;
    },
    render: function (elements) {
      var fragment = document.createDocumentFragment();
      elements.forEach(function (ad, adId) {
        fragment.appendChild(window.pin.generate(ad, adId));
      });
      window.variableUtil.mapPinsContainer.appendChild(fragment);
    }
  };
})();

'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinsContainer = window.variableUtil.mapPinsContainer;

  var generateElement = function (ad, adId) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinElement.style.left = ad.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.setAttribute('id', String(adId));
    return pinElement;
  };

  var renderElements = function () {
    window.load(successHandler, errorHandler);
  };

  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    var data = pins.slice(0, 5);
    data.forEach(function (ad, adId) {
      fragment.appendChild(generateElement(ad, adId));
    });
    mapPinsContainer.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '26px';
    node.style.fontFamily = '"Roboto", "Arial", sans-serif';
    node.style.color = 'black';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pin = {
    generate: generateElement,
    render: renderElements
  };

})();

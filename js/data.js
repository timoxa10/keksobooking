'use strict';

(function () {
  var renderPins = window.pin.render;
  var getServerData = window.backend.get;

  var receiveData = function () {
    getServerData(successHandler, errorHandler);
  };

  var successHandler = function (ads) {
    window.ads = ads;
    renderPins(window.ads);
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

  window.data = {
    receive: receiveData
  };
})();

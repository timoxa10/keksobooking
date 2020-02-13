'use strict';

(function () {
  var getRandomNumberInRange = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  var getRandomItem = function (array) {
    return array[getRandomNumberInRange(0, array.length)];
  };

  var getShuffledArray = function (array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    var startingIndex = 0;
    while (startingIndex !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  var getArrayWithRandomLength = function (array) {
    return getShuffledArray(array).slice(0, getRandomNumberInRange(1, array.length));
  };

  var addClass = function (element, className) {
    return element.classList.add(className);
  };

  var removeClass = function (element, className) {
    return element.classList.remove(className);
  };

  var generateLabelledList = function (array) {
    var cardList = array.map(function (item) {
      return '<li class="popup__feature popup__feature--' + item + '"></li>';
    }).join('\n');
    return cardList;
  };

  var generateGalleryElements = function (array) {
    var cardGallery = array.map(function (item) {
      return '<img src="' + item + '"' + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }).join('\n');
    return cardGallery;
  };

  var normalizeEndings = function (number, forms) {
    number = Number(number);
    if (number % 100 === 11) {
      return forms[0];
    }
    var remainder = number % 10;
    switch (true) {
      case remainder === 0 || remainder > 4:
        return forms[0];
      case remainder === 1:
        return forms[1];
      default:
        return forms[2];
    }
  };

  var normalizeRoomsEndings = function (number) {
    var forms = ['комнат', 'комната', 'комнаты'];
    return normalizeEndings(number, forms);
  };

  var normalizeGuestsEndings = function (number) {
    var forms = ['гостей', 'гостя', 'гостей'];
    return normalizeEndings(number, forms);
  };

  window.util = {
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomItem: getRandomItem,
    getShuffledArray: getShuffledArray,
    getArrayWithRandomLength: getArrayWithRandomLength,
    addClass: addClass,
    removeClass: removeClass,
    generateLabelledList: generateLabelledList,
    generateGalleryElements: generateGalleryElements,
    normalizeEndings: normalizeEndings,
    normalizeRoomsEndings: normalizeRoomsEndings,
    normalizeGuestsEndings: normalizeGuestsEndings
  };
})();

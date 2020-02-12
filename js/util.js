'use strict';

(function () {
  window.util = {
    getRandomNumberInRange: function (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    },
    getRandomItem: function (array) {
      return array[window.util.getRandomNumberInRange(0, array.length)];
    },
    getShuffledArray: function (array) {
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
    },
    getArrayWithRandomLength: function (array) {
      return window.util.getShuffledArray(array).slice(0, window.util.getRandomNumberInRange(1, array.length));
    },
    addClass: function (element, className) {
      return element.classList.add(className);
    },
    removeClass: function (element, className) {
      return element.classList.remove(className);
    },
    generateLabelledList: function (array) {
      var cardList = array.map(function (item) {
        return '<li class="popup__feature popup__feature--' + item + '"></li>';
      }).join('\n');
      return cardList;
    },
    generateGalleryElements: function (array) {
      var cardGallery = array.map(function (item) {
        return '<img src="' + item + '"' + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      }).join('\n');
      return cardGallery;
    },
    normalizeEndings: function (number, forms) {
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
    },
    normalizeRoomsEndings: function (number) {
      var forms = ['комнат', 'комната', 'комнаты'];
      return window.util.normalizeEndings(number, forms);
    },
    normalizeGuestsEndings: function (number) {
      var forms = ['гостей', 'гостя', 'гостей'];
      return window.util.normalizeEndings(number, forms);
    }
  };
})();

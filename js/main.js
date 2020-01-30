'use strict';

var NUMBER_OF_ADS = 8;
var BOOKING_TYPES = ['flat', 'house', 'bungalo', 'palace'];
var BOOKING_CHECKINS = ['12:00', '13:00', '14:00'];
var BOOKING_CHECKOUTS = ['12:00', '13:00', '14:00'];
var BOOKING_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var BOOKING_DESCRIPTION = ['прекрасный вид на море', 'бассейн', 'все включено', 'гости оценили завтраки', 'близко к морю', 'семейный отдых', 'выбор клиентов', 'лучшая цена', 'ранее бронирование'];
var BOOKING_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel5.jpg'
];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var BOOKING_PRICE = {
  min: 1,
  max: 12000
};
var BOOKING_ROOMS = {
  min: 1,
  max: 6
};
var BOOKING_GUESTS = {
  min: 1,
  max: 8
};
var PIN_COORDS = {
  xCord: {
    min: 0,
    max: 1200
  },
  yCord: {
    min: 130,
    max: 630
  }
};
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
// var popupTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var popupElement = popupTemplate.cloneNode(true);

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

var removeClass = function (element, className) {
  return element.classList.remove(className);
};

var drawPage = function () {
  removeClass(map, 'map--faded');
};

var generateAd = function (authorNumber) {
  var cordsX = getRandomNumberInRange(PIN_COORDS.xCord.min, PIN_COORDS.xCord.max);
  var cordsY = getRandomNumberInRange(PIN_COORDS.yCord.min, PIN_COORDS.yCord.max);
  return {
    author: {
      avatar: 'img/avatars/user0' + authorNumber + '.png'
    },
    offer: {
      title: '',
      address: cordsX + ', ' + cordsY,
      price: getRandomNumberInRange(BOOKING_PRICE.min, BOOKING_PRICE.max),
      type: getRandomItem(BOOKING_TYPES),
      rooms: getRandomNumberInRange(BOOKING_ROOMS.min, BOOKING_ROOMS.max),
      guests: getRandomNumberInRange(BOOKING_GUESTS.min, BOOKING_GUESTS.max),
      checkin: getRandomItem(BOOKING_CHECKINS),
      checkout: getRandomItem(BOOKING_CHECKOUTS),
      features: getArrayWithRandomLength(BOOKING_FEATURES),
      description: getArrayWithRandomLength(BOOKING_DESCRIPTION),
      photos: getArrayWithRandomLength(BOOKING_PHOTOS)
    },
    location: {
      x: cordsX,
      y: cordsY
    }
  };
};

var generateAds = function (numberOfElements) {
  var generatedItems = [];
  for (var i = 0; i < numberOfElements; i++) {
    generatedItems.push(generateAd(i + 1));
  }
  return generatedItems;
};

var generatePin = function (ad) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.style.left = ad.location.x - (PIN_WIDTH / 2) + 'px';
  return pinElement;
};

var renderPins = function (listOfItems) {
  var fragment = document.createDocumentFragment();
  listOfItems.forEach(function (ad) {
    fragment.appendChild(generatePin(ad));
  });
  mapPin.appendChild(fragment);
};

var adsList = generateAds(NUMBER_OF_ADS);
drawPage();
renderPins(adsList);

'use strict';

var NUMBEROFADS = 8;
var BOOKING_TYPES = ['flat', 'house', 'bungalo', 'palace'];
var BOOKING_CHECKINS = ['12:00', '13:00', '14:00'];
var BOOKING_CHECKOUTS = ['12:00', '13:00', '14:00'];
var BOOKING_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var BOOKING_DESCRIPTION = ['прекрасный вид на море', 'бассейн', 'все включено', 'гости оценили завтраки', 'близко к морю', 'семейный отдых', 'выбор клиентов', 'лучшая цена', 'ранее бронирование'];
var PINWITH = 50;
var PINHEIGHT = 70;
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
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var popupElement = popupTemplate.cloneNode(true);

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomItem = function (randomArray) {
  return randomArray[getRandomNumber(0, randomArray.length)];
};

var getRandomElements = function (array, count) {
  count = array.length;
  var randomCount = getRandomNumber(1, count + 1);
  var shuffled = array.slice(0);
  var i = array.length;
  var min = i - randomCount;
  var temp;
  var index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

var calculatePinX = function (cordsX) {
  return cordsX - PINHEIGHT;
};

var calculatePinY = function (cordsY) {
  return cordsY - PINWITH / 2;
};

var removeClass = function (element, className) {
  return element.classList.remove(className);
};

var pageInitialization = function () {
  removeClass(map, 'map--faded');
};
pageInitialization();

var generateAd = function (j) {
  var cordsX = calculatePinX(getRandomNumber(PIN_COORDS.xCord.min, PIN_COORDS.xCord.max));
  var cordsY = calculatePinY(getRandomNumber(PIN_COORDS.yCord.min, PIN_COORDS.yCord.max));
  var nearestAds = {
    author: {
      avatar: 'img/avatars/user0' + j + '.png'
    },
    offer: {
      title: '',
      address: cordsX + ', ' + cordsY,
      price: getRandomNumber(BOOKING_PRICE.min, BOOKING_PRICE.max),
      type: getRandomItem(BOOKING_TYPES),
      rooms: getRandomNumber(BOOKING_ROOMS.min, BOOKING_ROOMS.max),
      guests: getRandomNumber(BOOKING_GUESTS.min, BOOKING_GUESTS.max),
      checkin: getRandomItem(BOOKING_CHECKINS),
      checkout: getRandomItem(BOOKING_CHECKOUTS),
      features: getRandomElements(BOOKING_FEATURES),
      description: getRandomElements(BOOKING_DESCRIPTION),
      photos: []
    },
    location: {
      x: cordsX,
      y: cordsY
    }
  };
  return nearestAds;
};

var generateAds = function (numberOfElements) {
  var generatedArray = [];
  for (var i = 0; i < numberOfElements; i++) {
    generatedArray.push(generateAd(i + 1));
  }
  return generatedArray;
};

var adsList = generateAds(NUMBEROFADS);

var generatePin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.style.top = ad.location.y + 'px';
  pinElement.style.left = ad.location.x + 'px';
  return pinElement;
};

var renderPins = function (newArray) {
  var fragment = document.createDocumentFragment();
  newArray.forEach(function (ad, number) {
    fragment.appendChild(generatePin(ad, number));
  });
  mapPin.appendChild(fragment);
};

renderPins(adsList);

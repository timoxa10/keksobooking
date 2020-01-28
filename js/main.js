'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
// var popupTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var popupElement = popupTemplate.cloneNode(true);
var numberOfAds = 8;
var addsList = [];
var BOOKING_TYPE = ['flat', 'house', 'bungalo'];
var BOOKING_CHECKIN = ['12:00', '13:00', '14:00'];
var BOOKING_CHECKOUT = ['12:00', '13:00', '14:00'];
var BOOKING_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var FEATURES_NUMBER = {
  min: 0,
  max: 6
};
var PIN_COORDS = {
  xCord: {
    min: 300,
    max: 900
  },
  yCord: {
    min: 130,
    max: 630
  }
};
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomItem = function (randomArray) {
  return randomArray[getRandomNumber(0, randomArray.length)];
};

var generateAd = function () {
  var cordsX = getRandomNumber(PIN_COORDS.xCord.min, PIN_COORDS.xCord.max);
  var cordsY = getRandomNumber(PIN_COORDS.yCord.min, PIN_COORDS.yCord.max);
  var nearestAdds = {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: '',
      address: cordsX + ', ' + cordsY,
      price: '',
      type: getRandomItem(BOOKING_TYPE),
      rooms: '',
      guests: '',
      checkin: getRandomItem(BOOKING_CHECKIN),
      checkout: getRandomItem(BOOKING_CHECKOUT),
      features: BOOKING_FEATURES.slice(getRandomNumber(FEATURES_NUMBER.min, FEATURES_NUMBER.max)),
      description: '',
      photos: []
    },
    location: {
      x: cordsX,
      y: cordsY
    }
  };
  return nearestAdds;
};

var generateArrayOfAdds = function (numberOfElements) {
  for (var i = 0; i < numberOfElements; i++) {
    addsList.push(generateAd());
  }
  return addsList;
};

addsList = generateArrayOfAdds(numberOfAds);

var generatePins = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.style.top = ad.location.y + 'px';
  pinElement.style.left = ad.location.x + 'px';
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < addsList.length; i++) {
  fragment.appendChild(generatePins(addsList[i]));
}
mapPin.appendChild(fragment);

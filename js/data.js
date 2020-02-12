'use strict';

(function () {
  var NUMBER_OF_ADS = 8;
  var BOOKING_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var BOOKING_CHECKINS = ['12:00', '13:00', '14:00'];
  var BOOKING_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var BOOKING_TITLES = ['Уютное гнездышко для молодоженов', 'Апартаменты в центре города', 'Дом с видом на горы', 'Дворец 16 века'];
  var BOOKING_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var BOOKING_DESCRIPTION = [
    'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
    'Развлечения и бесплатные услуги в отелях citizenM Hotels.',
    'Музыкальный плейлист от группы отелей Morgans Hotel Group. Для меломанов всех возрастов.',
    'Hilton Suggests осуществляет коммуникации только посредством Twitter, чтобы помочь людям, планирующим поездку в различные направления, сделать их путешествие легче и приятнее.'
  ];
  var BOOKING_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
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
  var createObject = function (authorNumber) {
    var cordsX = window.util.getRandomNumberInRange(PIN_COORDS.xCord.min, PIN_COORDS.xCord.max);
    var cordsY = window.util.getRandomNumberInRange(PIN_COORDS.yCord.min, PIN_COORDS.yCord.max);
    return {
      author: {
        avatar: 'img/avatars/user0' + authorNumber + '.png'
      },
      offer: {
        title: window.util.getRandomItem(BOOKING_TITLES),
        address: cordsX + ', ' + cordsY,
        price: window.util.getRandomNumberInRange(BOOKING_PRICE.min, BOOKING_PRICE.max),
        type: window.util.getRandomItem(BOOKING_TYPES),
        rooms: window.util.getRandomNumberInRange(BOOKING_ROOMS.min, BOOKING_ROOMS.max),
        guests: window.util.getRandomNumberInRange(BOOKING_GUESTS.min, BOOKING_GUESTS.max),
        checkin: window.util.getRandomItem(BOOKING_CHECKINS),
        checkout: window.util.getRandomItem(BOOKING_CHECKOUTS),
        features: window.util.getArrayWithRandomLength(BOOKING_FEATURES),
        description: window.util.getRandomItem(BOOKING_DESCRIPTION),
        photos: window.util.getArrayWithRandomLength(BOOKING_PHOTOS)
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
      generatedItems.push(createObject(i + 1));
    }
    return generatedItems;
  };
  window.data = {
    adsList: generateAds(NUMBER_OF_ADS)
  };
})();

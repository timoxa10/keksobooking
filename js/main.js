'use strict';

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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var INACTIVE_MAIN_PIN_WIDTH = 65;
var INACTIVE_MAIN_PIN_HEIGHT = 65;

var ACTIVE_MAIN_PIN_WIDTH = 65;
var ACTIVE_MAIN_PIN_HEIGHT = 75;

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
var ACCOMMODATION_TYPE = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец'
};
var HOUSING_PRICES = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var ENTER_KEY = 'Enter';
var LEFT_MOUSE_BUTTON_KEY = 0;
var MIN_TITLE_LENGTH = 30;
var roomsCapacityMap = {
  '1': {
    'guests': ['1'],
    'errorText': '1 комната для 1 гостя'
  },
  '2': {
    'guests': ['1', '2'],
    'errorText': '2 комнаты для 1 или 2 гостей'
  },
  '3': {
    'guests': ['1', '2', '3'],
    'errorText': '3 комнаты для 1, 2 или 3 гостей'
  },
  '100': {
    'guests': ['0'],
    'errorText': '100 комнат не для гостей'
  },
};
var map = document.querySelector('.map');
var mapPin = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var mapFiltersSelectLists = mapFilters.querySelectorAll('select');
var mapFiltersFieldset = mapFilters.querySelector('.map__features');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var addressField = adForm.querySelector('#address');
var headlineField = adForm.querySelector('#title');
var pricePerNightField = adForm.querySelector('#price');
var checkinField = adForm.querySelector('#timein');
var checkoutField = adForm.querySelector('#timeout');
var roomsField = adForm.querySelector('#room_number');
var guestsField = adForm.querySelector('#capacity');
var typeOfHousingField = adForm.querySelector('#type');

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

var createObject = function (authorNumber) {
  var cordsX = getRandomNumberInRange(PIN_COORDS.xCord.min, PIN_COORDS.xCord.max);
  var cordsY = getRandomNumberInRange(PIN_COORDS.yCord.min, PIN_COORDS.yCord.max);
  return {
    author: {
      avatar: 'img/avatars/user0' + authorNumber + '.png'
    },
    offer: {
      title: getRandomItem(BOOKING_TITLES),
      address: cordsX + ', ' + cordsY,
      price: getRandomNumberInRange(BOOKING_PRICE.min, BOOKING_PRICE.max),
      type: getRandomItem(BOOKING_TYPES),
      rooms: getRandomNumberInRange(BOOKING_ROOMS.min, BOOKING_ROOMS.max),
      guests: getRandomNumberInRange(BOOKING_GUESTS.min, BOOKING_GUESTS.max),
      checkin: getRandomItem(BOOKING_CHECKINS),
      checkout: getRandomItem(BOOKING_CHECKOUTS),
      features: getArrayWithRandomLength(BOOKING_FEATURES),
      description: getRandomItem(BOOKING_DESCRIPTION),
      photos: getArrayWithRandomLength(BOOKING_PHOTOS)
    },
    location: {
      x: cordsX,
      y: cordsY
    }
  };
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

var generateAds = function (numberOfElements) {
  var generatedItems = [];
  for (var i = 0; i < numberOfElements; i++) {
    generatedItems.push(createObject(i + 1));
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

var fillCard = function (cardItem) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = cardItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardItem.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = cardItem.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('.popup__type').textContent = ACCOMMODATION_TYPE[cardItem.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = cardItem.offer.rooms + ' ' + normalizeRoomsEndings(cardItem.offer.rooms) + ' для ' + cardItem.offer.guests + ' ' + normalizeGuestsEndings(cardItem.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', generateLabelledList(cardItem.offer.features));
  cardElement.querySelector('.popup__description').textContent = cardItem.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', generateGalleryElements(cardItem.offer.photos));
  return cardElement;
};

var renderPins = function (elements) {
  var fragment = document.createDocumentFragment();
  elements.forEach(function (ad) {
    fragment.appendChild(generatePin(ad));
  });
  mapPin.appendChild(fragment);
};

var renderCards = function (element) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(fillCard(element));
  mapFilters.appendChild(fragment);
};

var adsList = generateAds(NUMBER_OF_ADS);

var setInactiveFieldsState = function (elements) {
  return elements.forEach(function (item) {
    item.setAttribute('disabled', '');
  });
};

var setActiveFieldsState = function (elements) {
  return elements.forEach(function (item) {
    item.removeAttribute('disabled', '');
  });
};

var getMapPinMainDefaultCoords = function () {
  var coordinates = {
    left: Math.floor(parseInt(mapPinMain.style.left, 10) + (INACTIVE_MAIN_PIN_WIDTH / 2)),
    top: Math.floor(parseInt(mapPinMain.style.top, 10) + (INACTIVE_MAIN_PIN_HEIGHT / 2))
  };
  return addressField.setAttribute('value', coordinates.left + ', ' + coordinates.top);
};

var getMapPinMainActivatedCoords = function () {
  var coordinates = {
    left: Math.floor(parseInt(mapPinMain.style.left, 10) + (ACTIVE_MAIN_PIN_WIDTH / 2)),
    top: Math.floor(parseInt(mapPinMain.style.top, 10) + ACTIVE_MAIN_PIN_HEIGHT)
  };
  return addressField.setAttribute('value', coordinates.left + ', ' + coordinates.top);
};

var setActivePageState = function () {
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  renderPins(adsList);
  renderCards(adsList[0]);
  setActiveFieldsState(mapFiltersSelectLists);
  setActiveFieldsState(adFormFieldsets);
  mapFiltersFieldset.removeAttribute('disabled', '');
  getMapPinMainActivatedCoords();
  validateTitle();
  validatePrice();
  validateRoomsNumbers();
  headlineField.addEventListener('input', headlineFieldInputHandler);
  pricePerNightField.addEventListener('input', pricePerNightFieldInputHandler);
  roomsField.addEventListener('change', roomsFieldChangeHandler);
  guestsField.addEventListener('change', roomsFieldChangeHandler);
  checkinField.addEventListener('change', checkinChangeHandler);
  checkoutField.addEventListener('change', checkoutChangeHandler);
  typeOfHousingField.addEventListener('change', typeOfHousingFieldChangeHandler);
  mapPinMain.removeEventListener('keydown', enterKeydownHandler);
};

var validateTitle = function () {
  if (headlineField.validity.valueMissing) {
    headlineField.setCustomValidity('Обязательное поле');
  } else if (headlineField.value.length < MIN_TITLE_LENGTH) {
    headlineField.setCustomValidity('Имя должно состоять минимум из ' + MIN_TITLE_LENGTH + ' символов');
  } else {
    headlineField.setCustomValidity('');
  }
};

var validatePrice = function () {
  if (pricePerNightField.validity.valueMissing) {
    pricePerNightField.setCustomValidity('Обязательное поле');
  } else if (pricePerNightField.validity.rangeUnderflow) {
    pricePerNightField.setCustomValidity('Цена за ночь должна быть больше или равна ' + pricePerNightField.min + ' руб.');
  } else if (pricePerNightField.validity.rangeOverflow) {
    pricePerNightField.setCustomValidity('Цена за ночь не должна превышать ' + pricePerNightField.max + ' руб.');
  } else {
    pricePerNightField.setCustomValidity('');
  }
};

var validateRoomsNumbers = function () {
  var rooms = roomsField.value;
  var guests = guestsField.value;
  roomsField.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
};

var headlineFieldInputHandler = function () {
  validateTitle();
};

var pricePerNightFieldInputHandler = function () {
  validatePrice();
};

var roomsFieldChangeHandler = function () {
  validateRoomsNumbers();
};

var typeOfHousingFieldChangeHandler = function (evt) {
  var target = evt.target.value;
  pricePerNightField.setAttribute('min', HOUSING_PRICES[target]);
  pricePerNightField.setAttribute('placeholder', HOUSING_PRICES[target]);
};

var checkinChangeHandler = function (evt) {
  checkoutField.value = evt.target.value;
};

var checkoutChangeHandler = function (evt) {
  checkinField.value = evt.target.value;
};

var mapPinMainMouseDownHandler = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON_KEY) {
    setActivePageState();
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
  }
};

var enterKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    setActivePageState();
  }
};

var setInactivePageState = function () {
  setInactiveFieldsState(mapFiltersSelectLists);
  setInactiveFieldsState(adFormFieldsets);
  mapFiltersFieldset.setAttribute('disabled', '');
  getMapPinMainDefaultCoords();
};

mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
mapPinMain.addEventListener('keydown', enterKeydownHandler);
setInactivePageState();

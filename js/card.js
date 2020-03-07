'use strict';

(function () {
  var ACCOMMODATION_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
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
  var ACTIVE_MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var cardButtonClose = cardElement.querySelector('.popup__close');
  var mapFilters = document.querySelector('.map__filters-container');
  var removeClass = window.util.removeClass;
  var addClass = window.util.addClass;
  var normalizeRoomsEndings = window.util.normalizeRoomsEndings;
  var generateLabelledList = window.util.generateLabelledList;
  var generateGalleryElements = window.util.generateGalleryElements;
  var normalizeGuestsEndings = window.util.normalizeGuestsEndings;
  var mapPinMain = window.variableUtil.mapPinMain;
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var resetActivePin = window.pin.reset;

  var fillCard = function (cardItem) {
    cardElement.querySelector('.popup__avatar').src = cardItem.author.avatar;
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

  var renderCard = function (clickedPin) {
    var clickedId = parseInt(clickedPin.getAttribute('id'), 10);
    mapFilters.appendChild(fillCard(window.ads[clickedId]));
  };

  var openCard = function (evt) {
    var clickedPin = evt.target.classList.contains('map__pin') ? evt.target : evt.target.parentNode;
    if ((!clickedPin.classList.contains('map__pin--main')) && (clickedPin.classList.contains('map__pin'))) {
      renderCard(clickedPin);
      removeClass(cardElement, 'hidden');
      document.addEventListener('keydown', escapeKeydownHandler);
      resetActivePin();
      clickedPin.classList.add('map__pin--active');
    }
  };

  var closeCard = function () {
    addClass(cardElement, 'hidden');
    document.removeEventListener('keydown', escapeKeydownHandler);
    addClass(cardElement, 'hidden');
    resetActivePin();
  };

  var escapeKeydownHandler = function () {
    if (window.dialogUtil.isEscPressed) {
      closeCard();
      resetActivePin();
    }
  };

  var moveMapPinMain = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinTop = parseInt(mapPinMain.style.top, 10) + ACTIVE_MAIN_PIN_HEIGHT - shift.y;
      var pinLeft = parseInt(mapPinMain.style.left, 10) + Math.round(ACTIVE_MAIN_PIN_WIDTH / 2) - shift.x;

      if (pinTop >= PIN_COORDS.yCord.min && pinTop <= PIN_COORDS.yCord.max) {
        mapPinMain.style.top = pinTop - ACTIVE_MAIN_PIN_HEIGHT + 'px';
      } else {
        pinTop += shift.y;
      }

      if (pinLeft >= PIN_COORDS.xCord.min && pinLeft <= PIN_COORDS.xCord.max) {
        mapPinMain.style.left = pinLeft - ACTIVE_MAIN_PIN_WIDTH / 2 + 'px';
      } else {
        pinLeft += shift.x;
      }

      addressField.setAttribute('value', pinLeft + ', ' + pinTop);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  var mapPinMainMouseDownHandlerMove = function (evt) {
    moveMapPinMain(evt);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandlerMove);

  window.card = {
    closeButton: cardButtonClose,
    fill: fillCard,
    render: renderCard,
    open: openCard,
    close: closeCard,
    move: moveMapPinMain
  };
})();

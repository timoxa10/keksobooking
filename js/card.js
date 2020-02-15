'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var cardButtonClose = cardElement.querySelector('.popup__close');
  var ACCOMMODATION_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };
  var mapFilters = document.querySelector('.map__filters-container');
  var adsList = window.data.adsList;
  var removeClass = window.util.removeClass;
  var addClass = window.util.addClass;
  var normalizeRoomsEndings = window.util.normalizeRoomsEndings;
  var generateLabelledList = window.util.generateLabelledList;
  var generateGalleryElements = window.util.generateGalleryElements;
  var normalizeGuestsEndings = window.util.normalizeGuestsEndings;

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
    mapFilters.appendChild(fillCard(adsList[clickedId]));
  };

  var openCard = function (evt) {
    var clickedPin = evt.target.classList.contains('map__pin') ? evt.target : evt.target.parentNode;
    if ((!clickedPin.classList.contains('map__pin--main')) && (clickedPin.classList.contains('map__pin'))) {
      renderCard(clickedPin);
      removeClass(cardElement, 'hidden');
      document.addEventListener('keydown', escapeKeydownHandler);
    }
  };

  var closeCard = function () {
    addClass(cardElement, 'hidden');
    document.removeEventListener('keydown', escapeKeydownHandler);
  };

  var escapeKeydownHandler = function () {
    if (window.dialogUtil.isEscPressed) {
      closeCard();
    }
  };

  window.card = {
    closeButton: cardButtonClose,
    fill: fillCard,
    render: renderCard,
    open: openCard,
    close: closeCard
  };
})();

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
  window.card = {
    cardButtonClose: cardButtonClose,
    fill: function (cardItem) {
      cardElement.querySelector('.popup__avatar').src = cardItem.author.avatar;
      cardElement.querySelector('.popup__title').textContent = cardItem.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = cardItem.offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = cardItem.offer.price + ' &#x20bd;/ночь';
      cardElement.querySelector('.popup__type').textContent = ACCOMMODATION_TYPE[cardItem.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = cardItem.offer.rooms + ' ' + window.util.normalizeRoomsEndings(cardItem.offer.rooms) + ' для ' + cardItem.offer.guests + ' ' + window.util.normalizeGuestsEndings(cardItem.offer.guests);
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
      cardElement.querySelector('.popup__features').innerHTML = '';
      cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', window.util.generateLabelledList(cardItem.offer.features));
      cardElement.querySelector('.popup__description').textContent = cardItem.offer.description;
      cardElement.querySelector('.popup__photos').innerHTML = '';
      cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', window.util.generateGalleryElements(cardItem.offer.photos));
      return cardElement;
    },
    render: function (clickedPin) {
      var clickedId = parseInt(clickedPin.getAttribute('id'), 10);
      window.form.mapFilters.appendChild(window.card.fill(window.data.adsList[clickedId]));
    },
    open: function (evt) {
      var clickedPin = evt.target.classList.contains('map__pin') ? evt.target : evt.target.parentNode;
      if ((!clickedPin.classList.contains('map__pin--main')) && (clickedPin.classList.contains('map__pin'))) {
        window.card.render(clickedPin);
        window.util.removeClass(cardElement, 'hidden');
        document.addEventListener('keydown', escapeKeydownHandler);
      }
    },
    close: function () {
      window.util.addClass(cardElement, 'hidden');
      document.removeEventListener('keydown', escapeKeydownHandler);
    }
  };
  var escapeKeydownHandler = function () {
    if (window.dialogUtil.isEscPressed) {
      window.card.close();
    }
  };
})();

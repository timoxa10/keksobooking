'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON_KEY = 0;

  var isEnterPressed = function (evt) {
    return evt.key === ENTER_KEY;
  };

  var isEscPressed = function (evt) {
    return evt.key === ESC_KEY;
  };

  var isLeftPressed = function (evt) {
    return evt.button === LEFT_MOUSE_BUTTON_KEY;
  };

  window.dialogUtil = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isLeftPressed: isLeftPressed
  };
})();

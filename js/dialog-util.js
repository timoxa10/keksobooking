'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON_KEY = 0;

  window.dialogUtil = {
    isEnterPressed: function (evt) {
      return evt.key === ENTER_KEY;
    },
    isEscPressed: function (evt) {
      return evt.key === ESC_KEY;
    },
    isLeftPressed: function (evt) {
      return evt.button === LEFT_MOUSE_BUTTON_KEY;
    }
  };
})();

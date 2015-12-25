function setUA(frame){
  var actualCode =  '(' + function() {
    'use strict';
    var navigator = window.navigator;
    var modifiedNavigator;
    if ('userAgent' in Navigator.prototype) {
      // Chrome 43+ moved all properties from navigator to the prototype,
      // so we have to modify the prototype instead of navigator.
      modifiedNavigator = Navigator.prototype;

    } else {
      // Chrome 42- defined the property on navigator.
      modifiedNavigator = Object.create(navigator);
      Object.defineProperty(window, 'navigator', {
        value: modifiedNavigator,
        configurable: false,
        enumerable: false,
        writable: false
      });
    }

    // Modify navigator.userAgent string
    Object.defineProperties(modifiedNavigator, {
      userAgent: {
        value: navigator.userAgent+' MSIE ',
        configurable: false,
        enumerable: true,
        writable: false
      },
      appVersion: {
        value: navigator.appVersion,
        configurable: false,
        enumerable: true,
        writable: false
      },
      platform: {
        value: navigator.platform,
        configurable: false,
        enumerable: true,
        writable: false
      }
    });


    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
      history.go(1);
    };
    /** another way to prevent history.back
    window.onbeforeunload = function(e) {
      return "Click 'stay' to prevent browser check";
    };**/
  } + ')();';

  document.documentElement.setAttribute('onreset', actualCode);
  document.documentElement.dispatchEvent(new CustomEvent('reset'));
  document.documentElement.removeAttribute('onreset');
  console.log("History disabled");
}

setUA();

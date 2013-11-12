var APP = require('core');
var CONFIG = arguments[0];

$.init = function() {
  APP.log("debug", "settings.init | " + JSON.stringify(CONFIG));

  if (APP.sendConnection == 'WIFI') {
    $.swWifi.setValue(true);
  }

  $.swWifi.addEventListener('change', function(e) {
    if (e.value == 1) {
      APP.sendConnection = 'WIFI';
    } else {
      APP.sendConnection = '3G';
    }
  });

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  if(CONFIG.isChild === true) {
    $.NavigationBar.showBack();
  }

  if(APP.Settings.useSlideMenu) {
    $.NavigationBar.showMenu();
    $.NavigationBar.showCamera();
  } else {
    $.NavigationBar.showSettings();
  }
};

// Kick off the init
$.init();
var APP = require('core');
var CONFIG = arguments[0];
var data = [];
var last_search = null;
var drupalServices = require('drupalServices');

$.init = function() {
  APP.log("debug", "explore.init | " + JSON.stringify(CONFIG));

  $.retrieveData('public_event', '');

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

$.retrieveData = function(type, search) {
  APP.openLoading();
  drupalServices.nodeList({
    type: type,
    title: search,
    success: function(data) {
      $.handleData(data);
      APP.closeLoading();
    },
    error: function(data) {
      APP.closeLoading();
    }
  });
};

$.handleData = function(_data) {
  APP.log("debug", "event.handleData");

  var rows = [];

  _data.forEach(function(event){
    // Add to the main view, only closed events
    if (event.field_event_closed === "1") {
      var newsItem = Alloy.createController('eventRow', event).getView();
      rows.push(newsItem);
    }
  });

  $.table.setData(rows);
};

$.search.addEventListener('return', function (e) {
  if (e.value !=  last_search) {
    last_search = e.value;

    if (e.value.indexOf('@') === 0) {
      APP.openLoading();

      drupalServices.searchUser({
        search: e.value.substring(1),
        success: function(users) {

          data = [];

          var json = JSON.parse(users);

          json.forEach(function(user){
            if (parseInt(user.uid) !== Titanium.App.Properties.getInt("userUid")) {
              // Keep only user different from current user.
              var newsItem = Alloy.createController('userRow', user).getView();
              data.push(newsItem);
            }
          });

          // Update View.
          $.table.setData(data);
          $.table.setAllowsSelection(true);

          APP.closeLoading();
        }
      });
    } else {

      $.retrieveData('public_event', e.value);

    }

    $.search.blur();
  }

});

// Kick off the init
$.init();

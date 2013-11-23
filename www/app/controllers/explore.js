var APP = require('core');
var CONFIG = arguments[0];
var data = [];
var last_search = null;
var drupalServices = require('drupalServices');

$.init = function() {
  APP.log("debug", "explore.init | " + JSON.stringify(CONFIG));

  $.retrieveData();

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
  drupalServices.nodeList(
    type,
    search,
    function(data) {
      $.handleData(data);
      APP.closeLoading();
    },
    function(data) {
      APP.closeLoading();
    }
  );
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

      drupalServices.searchUser(
        e.value.substring(1),
        function(users) {

          data = [];

          users.forEach(function(user){
            // Keep only user different from current user.
            var newsItem = Alloy.createController('userRow', user).getView();
            data.push(newsItem);
          });

          // Update View.
          $.table.setData(data);
          $.table.setAllowsSelection(true);

          APP.closeLoading();
        }
      );
    } else {

      $.retrieveData('', e.value);

    }

    $.search.blur();
  }

});

// Kick off the init
$.init();

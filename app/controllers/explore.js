Ti.include('config.js');

/*
 *  Initialize variables
 */

var data = [],
  url = REST_PATH + "/event.json?type=activity",
  nav = Alloy.createController('navActions'),
  uie = require('UiElements'),
  indicator = uie.createIndicatorWindow();

// Add button and menu to current window.
$.child_window.setLeftNavButton(nav.getView('menuBtn'));
$.child_window.setRightNavButton(nav.getView('cameraBtn'));
$.child_window.add(nav.getView("tooltipContainer"));
$.child_window.add(nav.getView("menu"));

var xhrUsers = Ti.Network.createHTTPClient({
  // Success callback.
  onload: function(e) {

    data = [];

    // Add events to views.
    json = JSON.parse(this.responseText);
    json.forEach(function(user){
      if (parseInt(user.uid) !== Titanium.App.Properties.getInt("userUid")) {
        // Keep only user different from current user.
        var newsItem = Alloy.createController('userRow', user).getView();
        data.push(newsItem);
      }
    });

    // Update View.
    $.table.setData(data);

    indicator.closeIndicator();
  },

  // Error callback
  onerror: function(e) {
    // Do ...
  },

  timeout: 5000
});

var last_search = null;

$.search.addEventListener('return', function (e) {
  if (e.value !=  last_search) {
    last_search = e.value;
    indicator.openIndicator();

    var urlUsers = REST_PATH + '/duppp_user.json?username=' + e.value;
    xhrUsers.open("GET", urlUsers);
    xhrUsers.send();

    $.search.blur();
  }
});

$.table.addEventListener('click', function(e){
  var win = Alloy.createController('profilePage', e.row.uid).getView();

  Titanium.API.fireEvent('openAsNavigation', {
    window: win
  });
});


/*
 *  Init variables.
 */

// Load child views, and initiate some vars.
var drupalServices = require('drupalServices'),
  userLoginWin = Alloy.createController('user').getView('userLogin'),
  eventsOpenWin = Alloy.createController('eventsOpen').getView();

// add open view.
$.indexView.add(eventsOpenWin);

/*
 *  Event declarations.
 */

// If user is connected.
Ti.API.addEventListener('app:registred', function () {
  $.indexView.open();
});

// If user is anonymous.
Ti.API.addEventListener('app:anonymous', function () {
  userLoginWin.open();
});

Ti.API.addEventListener('user:login', function () {

  drupalServices.getToken({
    success: function(token) {
      Ti.App.Properties.setString('token', token);
    },
    error: function(data) {
      alert('Error, contact the admin');
    }
  });

  $.indexView.open({
    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
  });

  Ti.API.fireEvent('index:open');
});

/*
 *  Navigations behavior declarations.
 */

Ti.API.addEventListener('clickMenuChild', function(data) {
  $.indexView.tabs[data.tab_id].active = true;
});

Ti.API.addEventListener('openAsNavigation', function(data) {
  $.indexView.activeTab.open(data.window);
});

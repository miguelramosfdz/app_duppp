
/*
 *  Init variables.
 */

// Include ajax and config file for make http request.
Ti.include('config.js');
Ti.include("tiajax.js");

// Load child views, and initiate some vars.
var userLoginWin = Alloy.createController('user').getView('userLogin'),
  eventsOpenWin = Alloy.createController('eventsOpen').getView(),
  ajax = Titanium.Network.ajax,
  urlInfo = REST_PATH + '/system/connect';

/*
 *  Function declarations.
 */

// Check if the user have an sessionID with correct uid.
function checkConnection() {
  ajax({
    type: "POST",
    url: urlInfo,
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {

      if (data.user.uid !== 0) {

        // Open default view.
        $.indexView.open();

      } else {

        // Open User form.
        userLoginWin.open();

        // Logout if you are connected to facebook.
        Ti.Facebook.logout();

      }
    },
    error: function(data) {
      console.log(data);
    }
  });
}

/*
 *  Event declarations.
 */

checkConnection();

Titanium.App.addEventListener('resume', function () {
  checkConnection();
});

Titanium.API.addEventListener('user:login', function () {
  $.indexView.open({
    transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
  });
});

// Navigation between tabs.
Titanium.API.addEventListener('clickMenuChild', function(data) {
  $.indexView.tabs[data.tab_id].active = true;
});

Titanium.API.addEventListener('openAsNavigation', function(data) {
  $.indexView.activeTab.open(data.window);
});

$.indexView.add(eventsOpenWin);

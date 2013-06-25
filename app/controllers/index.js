
/*
 *  Init variables.
 */

// Load child views, and initiate some vars.
var drupalServices = require('drupalServices'),
  userLoginWin = Alloy.createController('user').getView('userLogin'),
  eventsOpenWin = Alloy.createController('eventsOpen').getView(),
  fb = require('facebook');

drupalServices.getToken({
  success: function(token) {
    Ti.App.Properties.setString("token", token);

    drupalServices.systemInfo({
      success: function(data) {
        if (data.user.uid !== 0) {

          // Open default view.
          $.indexView.open();

        } else {

          // Logout if you are connected to facebook.
          //fb.logout();

          // Open User form.
          userLoginWin.open();

        }
      },
      error: function(data) {
        alert('Error, contact the admin');
      }
    });
  },
  error: function(data) {
    alert('Error, contact the admin');
  }
});

/*
 *  Event declarations.
 */

Titanium.API.addEventListener('user:login', function () {

  drupalServices.getToken({
    success: function(token) {
      Ti.App.Properties.setString("token", token);
    },
    error: function(data) {
      alert('Error, contact the admin');
    }
  });

  $.indexView.open({
    transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
  });
  Titanium.API.fireEvent('index:open');
});

// Navigation between tabs.
Titanium.API.addEventListener('clickMenuChild', function(data) {
  $.indexView.tabs[data.tab_id].active = true;
});

Titanium.API.addEventListener('openAsNavigation', function(data) {
  $.indexView.activeTab.open(data.window);
});

$.indexView.add(eventsOpenWin);

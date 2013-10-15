Alloy.Collections.recent = Alloy.createCollection('recent');
Alloy.Collections.media = Alloy.createCollection('media');

if (!Ti.App.Properties.getString('sendConnection')) {
  Ti.App.Properties.setString('sendConnection', '3G');
}

// Load child views, and initiate some vars.
var drupalServices = require('drupalServices');

// Get the token to acces to the api.
drupalServices.getToken({
  success: function(token) {

    // Stock Token in a property.
    Ti.App.Properties.setString('token', token);

    drupalServices.systemInfo({
      success: function(data) {

        // send login event.
        if (data.user.uid !== 0) {
          Titanium.API.fireEvent('app:registred');
        } else {
          Titanium.API.fireEvent('app:anonymous');
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
/*
 *  Initialize variables
 */

var args = arguments[0] || {},
  drupalServices = require('drupalServices'),
  medias = Alloy.Collections.media;
var APP = require("core");

// Map field with correct values
$.title.text = args.title;

if (args.uid != Titanium.App.Properties.getInt('userUid')) {
  $.button.hide();
}

function close() {

  // Doesn't allow to close if you still have event to close.
  if (medias.length === 0) {

    APP.openLoading();

    drupalServices.closeNode({
      nid: args.nid,
      success: function(data) {
        APP.closeLoading();
        Titanium.API.fireEvent('eventCreated');
      },
      error: function(data) {
        APP.closeLoading();
        alert('Sorry, your event cannot be closed.');
      }
    });

  } else {
    alert('Sorry, your cannot close your event, because some videos need to be uploaded.');
  }

}

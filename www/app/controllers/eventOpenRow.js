/*
 *  Initialize variables
 */

var data = [],
  args = arguments[0] || {},
  drupalServices = require('drupalServices');

var uie = require('UiElements');
var indicator = uie.createIndicatorWindow();

// Map field with correct values
$.title.text = args.title;

if (args.uid != Titanium.App.Properties.getInt('userUid')) {
  $.button.hide();
}


function close() {

  // Doesn't allow to close if you still have event to close.
  if (medias.length === 0) {

    indicator.openIndicator();

    drupalServices.closeNode({
      nid: args.nid,
      success: function(data) {
        indicator.closeIndicator();
        Titanium.API.fireEvent('eventCreated');
      },
      error: function(data) {
        indicator.closeIndicator();
        alert('Sorry, your event cannot be closed.');
      }
    });

  } else {
    alert('Sorry, your cannot close your event, because some videos need to be uploaded.');
  }

}

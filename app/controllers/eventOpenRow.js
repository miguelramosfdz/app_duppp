Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var data = [],
  ajax = Titanium.Network.ajax,
  args = arguments[0] || {},
  url = REST_PATH + "/event/" + args.nid + "/close",
  dupppUpload = require('duppp_upload');

var uie = require('UiElements');
var indicator = uie.createIndicatorWindow();

// Map field with correct values
$.title.text = args.title;


function close() {

  // Doesn't allow to close if you still have event to close.
  if (dupppUpload.mediaQueue.length === 0) {

    indicator.openIndicator();

    ajax({
      type: "POST",
      url: url,
      dataType: 'json',
      contentType: 'application/json',
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

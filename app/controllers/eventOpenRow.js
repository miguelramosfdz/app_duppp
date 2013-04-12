Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var data = [],
  ajax = Titanium.Network.ajax,
  args = arguments[0] || {},
  url = REST_PATH + "/event/" + args.nid + "/close";

var uie = require('UiElements');
var indicator = uie.createIndicatorWindow();

// Map field with correct values
$.title.text = args.title;


function close() {

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
}

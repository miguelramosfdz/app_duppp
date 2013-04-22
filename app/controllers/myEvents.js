Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *	Initialize variables
 */

var data = [],
    dataOpen = [],
    current_row,
    url = REST_PATH + "/event.json?type=my_events",
    pulling = false,
    reloading = false,
    ajax = Titanium.Network.ajax,
    nav = Alloy.createController('navActions'),
    uie = require('UiElements'),
    indicator = uie.createIndicatorWindow();

// Map fields with correct values.
$.child_window.setLeftNavButton(nav.getView('menuBtn'));
$.child_window.setRightNavButton(nav.getView('cameraBtn'));
$.child_window.add(nav.getView("tooltipContainer"));
$.child_window.add(nav.getView("menu"));

/*
 * Get all of my events.
 */
var xhr = Ti.Network.createHTTPClient({
  onload: function(e) {

    data = [];

    json = JSON.parse(this.responseText);
    json.forEach(function(event){

      // Add to the main view, only closed events
      if (event.field_event_closed === "1") {
        var newsItem = Alloy.createController('eventRow', event).getView();
        data.push(newsItem);
      }
    });

    indicator.closeIndicator();

    $.table.setData(data);

  },
  onerror: function(e) {
    Ti.API.debug(e.error);
    indicator.closeIndicator();
    alert('error');
  },
  timeout: 5000
});
 
$.child_window.addEventListener('open', function() {
  indicator.openIndicator();
	xhr.open("GET", url);
	xhr.send();
});

var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh', null, {
  table: $.table,
  loader: myLoaderCallback
});

function myLoaderCallback(widgetCallback) {
  var xhr2 = Ti.Network.createHTTPClient({
    onload: function(e) {

      data = [];

      json = JSON.parse(this.responseText);
      json.forEach(function(event){

        // Add to the main view, only closed events
        if (event.field_event_closed === "1") {
          var newsItem = Alloy.createController('eventRow', event).getView();
          data.push(newsItem);
        }
      });

      indicator.closeIndicator();

      widgetCallback(true);

      $.table.setData(data);

    },
    onerror: function(e) {

      widgetCallback(true);

      alert('error');
    },
    timeout: 5000
  });


  xhr2.open("GET", url);
  xhr2.send();
}

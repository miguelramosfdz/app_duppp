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

/*
 * Get all of my events.
 */
var xhr = Ti.Network.createHTTPClient({
  onload: function(e) {
    json = JSON.parse(this.responseText);
        
    // Create tableViewRow for each event.
    json.forEach(function(event){
      if (event.field_event_closed === "1") {
        var newsItem = Alloy.createController('eventRow', event).getView();
        data.push(newsItem);
      }
    });
    $.table.setData(data);
    indicator.closeIndicator();
  },
  onerror: function(e) {
    alert('The server cannot be reached');
    indicator.closeIndicator();
  },
  timeout: 5000
});

// Call the xhr.
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
      // Empty table and remove children of tableOpen view.
      data = [];

      // Add events to views
      json = JSON.parse(this.responseText);
      json.forEach(function(event){
        if (event.field_event_closed === "1") {
          var newsItem = Alloy.createController('eventRow', event).getView();
          data.push(newsItem);
        }
      });

      Titanium.API.fireEvent('refreshEvents');

      $.table.setData(data);

      widgetCallback(true);
    },
    onerror: function(e) {
      Ti.API.debug(e.error);
      alert('error');
    },
    timeout: 5000
  });

  xhr2.open("GET", url);
  xhr2.send();
}


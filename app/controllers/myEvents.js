/*
 *	Initialize variables
 */

var dataEvents = [],
    nav = Alloy.createController('navActions'),
    uie = require('UiElements'),
    drupalServices = require('drupalServices'),
    indicator = uie.createIndicatorWindow();

// Map fields with correct values.
$.child_window.setLeftNavButton(nav.getView('menuBtn'));
$.child_window.setRightNavButton(nav.getView('cameraBtn'));
$.child_window.add(nav.getView("tooltipContainer"));
$.child_window.add(nav.getView("menu"));

/*
 * Get all of my events.
 */

// Prepare data and push to the tableView
function prepareData(data) {
  dataEvents = [];

  data.forEach(function(event){
    // Add to the main view, only closed events
    if (event.field_event_closed === "1") {
      var newsItem = Alloy.createController('eventRow', event).getView();
      dataEvents.push(newsItem);
    }
  });

  $.table.setData(dataEvents);
}

// Fetch events.
$.child_window.addEventListener('open', function() {
  indicator.openIndicator();

  drupalServices.nodeList({
    type: 'my_events',
    success: function(data) {
      prepareData(data);
      indicator.closeIndicator();
    },
    error: function(data) {
      indicator.closeIndicator();
      alert('error');
    }
  });
});

var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh', null, {
  table: $.table,
  loader: myLoaderCallback
});

function myLoaderCallback(widgetCallback) {
  drupalServices.nodeList({
    type: 'my_events',
    success: function(data) {
      prepareData(data);
      widgetCallback(true);
    },
    error: function(data) {
      widgetCallback(true);
      alert('error');
    }
  });
}

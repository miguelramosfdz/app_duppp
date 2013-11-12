var APP = require('core');
var CONFIG = arguments[0];
var drupalServices = require('drupalServices');

$.init = function() {
  APP.log("debug", "activity.init | " + JSON.stringify(CONFIG));

  APP.openLoading();

  $.retrieveData();

  $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");

  if(CONFIG.isChild === true) {
    $.NavigationBar.showBack();
  }

  if(APP.Settings.useSlideMenu) {
    $.NavigationBar.showMenu();
    $.NavigationBar.showCamera();
  } else {
    $.NavigationBar.showSettings();
  }
};

$.retrieveData = function() {
  drupalServices.nodeList(
    'my_events',
    '',
    function(data) {
      $.handleData(data);
      APP.closeLoading();
    },
    function(data) {
      APP.closeLoading();
    }
  );
};

$.handleData = function(_data) {
  APP.log("debug", "event.handleData");

  var rows = [];

  _data.forEach(function(event){
    // Add to the main view, only closed events
    if (event.field_event_closed === "1") {
      var newsItem = Alloy.createController('eventRow', event).getView();
      rows.push(newsItem);
    }
  });

  $.container.setData(rows);
};

var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh', null, {
  table: $.container,
  loader: myLoaderCallback
});

function myLoaderCallback(widgetCallback) {
  drupalServices.nodeList(
    'my_events',
    '',
    function(data) {
      $.handleData(data);
      widgetCallback(true);
    },
    function(data) {
      widgetCallback(true);
    }
  );
}

// Kick off the init
$.init();
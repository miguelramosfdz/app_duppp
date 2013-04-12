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

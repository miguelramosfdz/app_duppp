
/*
 *  Initialize variables
 */

var REST_PATH = Alloy.CFG.rest,
  dataEvents = [],
  nav = Alloy.createController('navActions'),
  uie = require('UiElements'),
  drupalServices = require('drupalServices'),
  indicator = uie.createIndicatorWindow();

// Add button and menu to current window.
$.child_window.setLeftNavButton(nav.getView('menuBtn'));
$.child_window.setRightNavButton(nav.getView('cameraBtn'));
$.child_window.add(nav.getView("tooltipContainer"));
$.child_window.add(nav.getView("menu"));
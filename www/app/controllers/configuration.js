
/*
 *  Initialize variables
 */

var nav = Alloy.createController('navActions');

// Add button and menu to current window.
$.child_window.setLeftNavButton(nav.getView('menuBtn'));
$.child_window.setRightNavButton(nav.getView('cameraBtn'));
$.child_window.add(nav.getView('tooltipContainer'));
$.child_window.add(nav.getView('menu'));

if (Ti.App.Properties.getString('sendConnection') == 'WIFI') {
  $.swWifi.setValue(true);
}

$.swWifi.addEventListener('change', function(e) {
  if (e.value == 1) {
    Ti.App.Properties.setString('sendConnection', 'WIFI');
  } else {
    Ti.App.Properties.setString('sendConnection', '3G');
  }
});
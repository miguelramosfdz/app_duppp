Ti.include('config.js');

/*
 *  Initialize variables
 */

var data = [],
    url = REST_PATH + "/events/activity.json",
    nav = Alloy.createController('navActions');

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
      if (event.closed === "1") {
        var newsItem = Alloy.createController('eventRow', event).getView();
        data.push(newsItem);
      }
    });
    $.table.setData(data);
  },
  onerror: function(e) {
    Ti.API.debug(e.error);
    alert('error');
  },
  timeout: 5000
});

// Call the xhr.
$.child_window.addEventListener('open', function() {
  xhr.open("GET", url);
  xhr.send();
});


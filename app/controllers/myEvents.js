Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *	Initialize variables
 */

var data = [],
    dataOpen = [],
    current_row,
    url = REST_PATH + "/events/my_events.json",
    pulling = false,
    reloading = false,
    ajax = Titanium.Network.ajax,
    nav = Alloy.createController('navActions');

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
      
        json = JSON.parse(this.responseText);
        json.forEach(function(event){
          
          // Add to the main view, only closed events
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
 
$.child_window.addEventListener('open', function() {
	xhr.open("GET", url);
	xhr.send();
});

/*
 * Behavior to get pull to refresh.
 */

$.table.headerPullView = $.pullingContainer;

$.table.addEventListener('scroll',function(e) {
	var offset = e.contentOffset.y;
	if (offset <= -65.0 && !pulling && !reloading)
	{
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		$.statusLabel.text = "Release to refresh...";
	}
	else if (pulling && (offset > -65.0 && offset < 0) && !reloading )
	{
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		$.statusLabel.text = "Pull down to refresh...";
	}
});

$.table.addEventListener('dragend', function(e) {
	if (pulling && !reloading) {
		reloading = true;
		pulling = false;
		$.arrow.hide();
		$.actInd.show();
		$.statusLabel.text = "Reloading...";
		$.table.setContentInsets({top: 60}, {animated: true});
		beginReloading();
	}
});


function beginReloading() {
	// just mock out the reload
	setTimeout(endReloading,2000);
}

function endReloading() {
	var xhr2 = Ti.Network.createHTTPClient({
	    onload: function(e) {
	      // Empty table and remove children of tableOpen view.
	    	data = [];
	    	
	    	// Add events to views
	      json = JSON.parse(this.responseText);
        json.forEach(function(event){
          if (event.closed === "1") {
            var newsItem = Alloy.createController('eventRow', event).getView();
            data.push(newsItem);
          }
        });
        
        Titanium.API.fireEvent('refreshEvents');
        
        $.table.setData(data);
	    },
	    onerror: function(e) {
	        Ti.API.debug(e.error);
	        alert('error');
	    },
	    timeout: 5000
	});
	
	xhr2.open("GET", url);
	xhr2.send();

	// when you're done, just reset
	$.table.setContentInsets({top:0},{animated:true});
	reloading = false;
	$.lastUpdatedLabel.text = "Last Updated:";
	$.statusLabel.text = "Pull down to refresh...";
	$.actInd.hide();
	$.arrow.show();
}

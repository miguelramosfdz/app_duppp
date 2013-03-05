Ti.include('config.js');
Ti.include("tiajax.js");

var data = [];
var current_row;
var url = REST_PATH + "/events/views/my_events.json?display_id=services_1";

var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        // this.responseText holds the raw text return of the message (used for JSON)
        // this.responseXML holds any returned XML (used for SOAP web services)
        // this.responseData holds any returned binary data
        json = JSON.parse(this.responseText);
        json.forEach(function(event){
        	var newsItem = Alloy.createController('eventRow', event).getView()
        	data.push(newsItem);
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

var pulling = false;
var reloading = false;

$.table.headerPullView = $.pullingContainer;

$.table.addEventListener('scroll',function(e)
{
	var offset = e.contentOffset.y;
	if (offset <= -65.0 && !pulling && !reloading)
	{
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		//$.arrow.animate({transform:t,duration:180});
		$.statusLabel.text = "Release to refresh...";
	}
	else if (pulling && (offset > -65.0 && offset < 0) && !reloading )
	{
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		//$.arrow.animate({transform:t,duration:180});
		$.statusLabel.text = "Pull down to refresh...";
	}
});
	
var event1 = 'dragEnd';
if (Ti.version >= '3.0.0') {
	event1 = 'dragend';
}

$.table.addEventListener(event1,function(e)
{
	if (pulling && !reloading)
	{
		reloading = true;
		pulling = false;
		$.arrow.hide();
		$.actInd.show();
		$.statusLabel.text = "Reloading...";
		$.table.setContentInsets({top:60},{animated:true});
		//$.arrow.transform=Ti.UI.create2DMatrix();
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
	    	data = [];
	        // this.responseText holds the raw text return of the message (used for JSON)
	        // this.responseXML holds any returned XML (used for SOAP web services)
	        // this.responseData holds any returned binary data
	        json = JSON.parse(this.responseText);
	        json.forEach(function(event){
	        	var newsItem = Alloy.createController('eventRow', event).getView()
        		data.push(newsItem);
	        });
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

$.tooltipContainer.addEventListener("click", function(e) {
	$.tooltipContainer.hide();
});

function openTooltip (){
	$.tooltipContainer.show();
}

function openMenu (){
	$.menu.show();
}

function openCamera() {
	$.tooltipContainer.hide();
	Ti.Media.showCamera({
        showControls: true,  
        mediaTypes: Ti.Media.MEDIA_TYPE_VIDEO,
		videoQuality: Ti.Media.QUALITY_MEDIUM,
        autohide: false,
        videoMaximumDuration: 10000,
        success:function(event) {
        	Ti.Media.hideCamera();
        },
        error:function(error) { }
    });
};

// Define $ and $.ajax
var ajax = Titanium.Network.ajax;

function createEvent () {
	if (Titanium.App.Properties.getInt("userUid")) {
		// Create a user variable to hold some information about the user
		var user = {
			uid: Titanium.App.Properties.getInt("userUid"),
			sessid: Titanium.App.Properties.getString("userSessionId"),
			session_name: Titanium.App.Properties.getString("userSessionName"),
			name: Titanium.App.Properties.getString("userName")
		}
	
		// Create a new node object
		var node = {
			node:{
		        title: "Test",
		        type:'event',
		        group_access: {
		            und: "0" 
		        },
		        field_event_date: {
		            und:[
		                {
		                    show_todate: "1",
		                    value: {
		                        month: "2",
		                        day: "14",
		                        year: "2013",
		                        hour: "20",
		                        minute: "15" 
		                    },
		                    value2: {
		                        month: "2",
		                        day: "15",
		                        year: "2013",
		                        hour: "20",
		                        minute: "15" 
		                    }
		                }
		            ]
		        },
		        uid: user.uid,
		        status: 1
		    }
		};

		// Define the url 
		// in this case, we'll connecting to http://example.com/api/rest/node
		var url = REST_PATH + '/events/node';

		// Use $.ajax to create the node
		ajax({
	        type: "POST",
	        url: url,
	        data: JSON.stringify(node), // Stringify the node
	        dataType: 'json',
	        contentType: 'application/json',
	        // On success do some processing like closing the window and show an alert
	        success: function(data) {
	            alert("Content created with id " + data.nid);
	        }
	    });
	}
	else {
		alert("You need to login first");
	}
}


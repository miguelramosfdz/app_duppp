
Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var data = [],
  current_row,
  url = REST_PATH + "/events/views/my_events.json?display_id=services_1",
  pulling = false,
  reloading = false,
  ajax = Titanium.Network.ajax;
  
// Get all open events and put in the menu at top.
var xhr2 = Ti.Network.createHTTPClient({
  onload: function(e) {
    // Add events to views
    json = JSON.parse(this.responseText);
    json.forEach(function(event){
      if (event.closed === "1") {
        return;
      }
      var openItem = Titanium.UI.createButton({
         title: event.node_title,
         backgroundImage: "none",
         backgroundGradient: {
           type: 'linear',
           startPoint: { x: '50%', y: '0%' },
           endPoint: { x: '50%', y: '100%' },
           colors: [ { color: '#0C99FC', offset: 0.0}, { color: '#0E76FC', offset: 1.0 } ],
         },
         width: Titanium.UI.FILL,
         font:{fontSize:18, fontWeight:"bold", fontFamily:'Helvetica Neue'},
         right: 10,
         top: 10,
         bottom: 10,
         height: 40,
         borderRadius: 5,
         left: 10,
         shadowColor:"#999",
         shadowOffset:{x:0,y:1}
      });
      $.tableOpen.add(openItem)
    });
  },
  onerror: function(e) {
    Ti.API.debug(e.error);
    alert('error');
  },
  timeout: 5000
});

xhr2.open("GET", url);
xhr2.send();

// Function to create an event
// @TODO Create the form for event type.
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

/*
 * Utility functions.
 */

function removeAllChildren(viewObject){
  //copy array of child object references because view's "children" property is live collection of child object references
  var children = viewObject.children.slice(0);
 
  for (var i = 0; i < children.length; ++i) {
    viewObject.remove(children[i]);
  }
}

/*
 * Misc events
 */

Titanium.API.addEventListener('refreshEvent', function(data) {
  xhr2.open("GET", url);
  xhr2.send();
})

// When you click on tooltip, close the tooltip.
// @TODO apply this behavior only on the background of the tooltip.
$.tooltipContainer.addEventListener("click", function(e) {
  $.tooltipContainer.hide();
});

function menuChild (e) {
  $.menu.hide();
  Titanium.API.fireEvent('clickMenuChild', {
    tab_id : e.source.index
  });
};

// Function to display the tooltip.
function openTooltip (){
  $.tooltipContainer.show();
};

// Function to display the menu.
function openMenu (){
  $.menu.show();
};


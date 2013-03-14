
Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var data = [],
  url = REST_PATH + "/events/my_events.json",
  ajax = Titanium.Network.ajax;

// Get all open events and put in the menu at top.
var xhr = Ti.Network.createHTTPClient({
  onload: function(e) {
    // Add events to views

    removeAllChildren($.tableOpen);

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

// When you click on tooltip, close the tooltip.
// @TODO apply this behavior only on the background of the tooltip.
$.tooltipContainer.addEventListener("click", function(e) {
  $.tooltipContainer.hide();
});

function openEventForm() {
  var eventForm = Alloy.createController('eventForm').getView();

  Titanium.API.fireEvent('openAsNavigation', {
    window: eventForm
  });
}

function menuChild (e) {
  $.menu.hide();
  Titanium.API.fireEvent('clickMenuChild', {
    tab_id : e.source.index
  });
};

// Function to display the tooltip.
function openTooltip (){
  xhr.open("GET", url);
  xhr.send();
  $.tooltipContainer.show();
};

// Function to display the menu.
function openMenu (){
  $.menu.show();
};


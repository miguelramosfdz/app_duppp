Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var data = [],
  url = REST_PATH + "/event.json?type=my_events",
  ajax = Titanium.Network.ajax,
  dupppUpload = require('duppp_upload');

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

  if (e.source.id === 'tooltipContainer') {
    $.tooltipContainer.hide();
  }

});

function openEventForm() {

  $.tooltipContainer.hide();

  var eventForm = Alloy.createController('eventForm').getView();

  Titanium.API.fireEvent('openAsNavigation', {
    window: eventForm
  });
}

function openCamera(nid) {

  $.tooltipContainer.hide();

  var user = {
    uid: Titanium.App.Properties.getInt("userUid"),
    sessid: Titanium.App.Properties.getString("userSessionId"),
    session_name: Titanium.App.Properties.getString("userSessionName"),
    name: Titanium.App.Properties.getString("userName")
  }

  Titanium.Media.showCamera({

    success: function(event) {

      dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);

    },
    error: function(error) {
      // create alert
      var a = Titanium.UI.createAlertDialog({title:'Video'});

      // set message
      if (error.code == Titanium.Media.NO_VIDEO) {
        a.setMessage('Device does not have video recording capabilities');
      } else {
        a.setMessage('Unexpected error: ' + error.code);
      }

      // show alert
      a.show();
    },
    mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
    videoMaximumDuration: 10000,
    videoQuality: Titanium.Media.QUALITY_MEDIUM
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
  $.tooltipContainer.show();
}

// Function to display the menu.
function openMenu (){
  $.menu.show();
}

Titanium.API.addEventListener('myEvents:fetched', function (data) {

  // Remove previous buttons.
  removeAllChildren($.tableOpen);

  $.tableOpen.height = 0;
  $.tableOpen.hide();
  $.tableOpenLabel.hide();

  if (data.data.length > 0) {

    data.data.forEach(function(event){

      // Create button for each event.
      var openItem = Titanium.UI.createButton({
        title: event.title,
        backgroundImage: "none",
        backgroundGradient: {
          type: 'linear',
          startPoint: { x: '50%', y: '0%' },
          endPoint: { x: '50%', y: '100%' },
          colors: [ { color: '#0C99FC', offset: 0.0}, { color: '#0E76FC', offset: 1.0 } ]
        },
        width: Titanium.UI.FILL,
        font:{fontSize:18, fontWeight:"bold", fontFamily:'Helvetica Neue'},
        right: 10,
        top: 10,
        bottom: 5,
        height: 40,
        borderRadius: 5,
        left: 10,
        shadowColor:"#999",
        shadowOffset:{x:0,y:1},
        nid: event.nid
      });

      // Add event to open camera on each button.
      openItem.addEventListener("click", function(e) {
        openCamera(e.source.nid);
      });

      // Add to the view.
      $.tableOpen.add(openItem);
      $.tableOpen.height = 100;
      $.tableOpen.show();
      $.tableOpenLabel.show();

    });

  }

});

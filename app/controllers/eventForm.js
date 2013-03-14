

Ti.include('config.js');
Ti.include("tiajax.js");

/*
 *  Initialize variables
 */

var ajax = Titanium.Network.ajax;

// Function to create an event
// @TODO Create the form for event type.
function createEvent() {
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
        title: $.textArea.value,
        type:'event',
        group_access: {
          und: "0"
        },
        field_event_date: {
          und:[{
            show_todate: "0",
            value: {
              month: "2",
              day: "14",
              year: "2013",
              hour: "20",
              minute: "15"
            }
          }]
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
        Titanium.API.fireEvent('refreshEvent');
        $.eventFormWindow.close({animated:true});
      }
    });
  }
  else {
    alert("You need to login first");
  }
}

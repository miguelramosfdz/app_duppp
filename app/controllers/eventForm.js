var REST_PATH = Alloy.CFG.rest;

/*
 *  Initialize variables
 */
var data = [],
  uie = require('UiElements'),
  indicator = uie.createIndicatorWindow(),
  drupalServices = require('drupalServices');

$.textArea.addEventListener('focus', function() {
  $.textArea.value = '';
});

$.table.addEventListener('click',function(e){
  if (e.rowData.selected) {
    e.row.hasCheck = false;
  } else {
    e.row.hasCheck = true;
  }
  e.rowData.selected = !e.rowData.selected;
});

var xhrUsers = Ti.Network.createHTTPClient({
  // Success callback.
  onload: function(e) {

    data = [];

    // Add events to views.
    json = JSON.parse(this.responseText);
    json.forEach(function(user){
      if (parseInt(user.uid) !== Titanium.App.Properties.getInt("userUid")) {
        // Keep only user different from current user.
        user.isNoReturn = true;
        var newsItem = Alloy.createController('userRow', user).getView();
        data.push(newsItem);
      }
    });

    // Update View.
    $.table.setData(data);

    indicator.closeIndicator();

  },

  // Error callback
  onerror: function(e) {
    // Do ...
  },

  timeout: 5000
});

/*
 * When the view is instantiate.
 */

var last_search = null;

$.search.addEventListener('return', function (e) {
  if (e.value !=  last_search) {
    last_search = e.value;
    indicator.openIndicator();

    var urlUsers = REST_PATH + '/duppp_user.json?username=' + e.value;
    xhrUsers.open("GET", urlUsers);
    xhrUsers.send();

    $.search.blur();
  }
});

function nextStep() {
  Titanium.API.fireEvent('openAsNavigation', {
    window: $.eventFormWindowStep2
  });
}


// Function to create an event
function createEvent() {

  var clickedRows = [];

  if ($.table.data.length > 0) {
    for(var i=0; i < $.table.data[0].rows.length ; i++) {
      if ($.table.data[0].rows[i].hasCheck == true) {
        clickedRows.push($.table.data[0].rows[i].uid)
      }
    }
  }

  $.createBtn.enabled = false;

  if (Titanium.App.Properties.getInt("userUid")) {
    // Create a user variable to hold some information about the user
    var user = {
      uid: Titanium.App.Properties.getInt("userUid"),
      sessid: Titanium.App.Properties.getString("userSessionId"),
      session_name: Titanium.App.Properties.getString("userSessionName"),
      name: Titanium.App.Properties.getString("userName")
    };
    var switchPrivate;

    if ($.switchPrivate.value == 1) {
      switchPrivate = "1";
    } else {
      switchPrivate = "0";
    }

    drupalServices.createNode({
      node: {
        "type": "event",
        "title": $.textArea.value,
        "language": "und",
        "group_access": {
          "und": switchPrivate
        },
        "field_event_date": {
          "und":[{
            "show_todate": "0",
            "value": {
              "month": "2",
              "day": "14",
              "year": "2013",
              "hour": "20",
              "minute": "15"
            }
          }]
        },
        "uid": user.uid,
        "status": 1
      },
      success: function (data) {
        $.eventFormWindow.close();
        $.eventFormWindowStep2.close({animated:true});
        $.createBtn.enabled = true;
        Titanium.API.fireEvent('eventCreated');

        var join = {
          uid: clickedRows
        }

        drupalServices.joinNode({
          node: join,
          nid: data.nid
        });
      },
      error: function(data) {
        alert("There was an error, try again.");
      }
    });

  }
  else {
    alert("You need to login first");
  }
}

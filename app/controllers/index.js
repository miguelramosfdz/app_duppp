
/*
 *  Init variables.
 */

// Include config file for make http request.
Ti.include('config.js');

// Load child views, and initiate some vars.
var userLoginWin = Alloy.createController('user').getView('userLogin'),
  eventsOpenWin = Alloy.createController('eventsOpen').getView(),
  urlInfo = REST_PATH + '/system/connect';

/*
 *  Function declarations.
 */

// Check if the user have an sessionID with correct uid.
function checkConnection() {

  // Create a connection
  var xhr3 = Titanium.Network.createHTTPClient();

  xhr3.setRequestHeader('Content-Type','application/json; charset=utf-8');

  // Open the connection using POST
  xhr3.open("POST", urlInfo);

  // Send the connection and the user object as argument
  xhr3.send();

  // When the connection loads we do:
  xhr3.onload = function() {
    // Save the status of the connection in a variable
    // this will be used to see if we have a connection (200) or not
    var statusCode = xhr3.status;

    // Check if we have a valid status
    if (statusCode == 200) {

      // Create a variable response to hold the response
      var response = xhr3.responseText;

      // Parse (build data structure) the JSON response into an object (data)
      var data = JSON.parse(response);

      if (data.user.uid !== 0) {

        // Open default view.
        $.indexView.open();

      } else {

        // Open User form.
        userLoginWin.open();

        // Logout if you are connected to facebook.
        Ti.Facebook.logout();

      }
    }
    else {
      alert("There was an error");
    }
  };
}

/*
 *  Event declarations.
 */

checkConnection();

Titanium.App.addEventListener('resume', function () {
  checkConnection();
});

Titanium.API.addEventListener('user:login', function () {
  $.indexView.open({
    transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
  });
  Titanium.API.fireEvent('index:open');
});

// Navigation between tabs.
Titanium.API.addEventListener('clickMenuChild', function(data) {
  $.indexView.tabs[data.tab_id].active = true;
});

Titanium.API.addEventListener('openAsNavigation', function(data) {
  $.indexView.activeTab.open(data.window);
});

$.indexView.add(eventsOpenWin);

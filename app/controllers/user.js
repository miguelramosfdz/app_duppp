/*
 *  Initialize variables
 */

// Facebook Button
var REST_PATH = Alloy.CFG.rest,
  urlFB = REST_PATH + '/facebook_connect/connect',
  drupalServices = require('drupalServices'),
  fb = require('facebook');

fb.permissions = ['publish_stream', 'email', 'read_friendlists']; // Permissions your app needs, sync with the permissions you set in fboauth
fb.appid = '457579484312297'; // Permissions your app needs, sync with the permissions you set in fboauth
fb.forceDialogAuth = true;

function login(e){

  // Create an object to hold the data entered in the form
  drupalServices.userLogin({
    node: {
      username: $.loginUsr.value,
      password: $.loginPwd.value
    },
    success: function(data) {

      // Set a global variable
      Titanium.App.Properties.setInt("userUid", data.user.uid);
      Titanium.App.Properties.setInt("userSessionId", data.sessid);
      Titanium.App.Properties.setInt("userSessionName", data.sesion_name);


      // Close the window.
      $.userLoginDuppp.close();

      // Fire event login
      Titanium.API.fireEvent('user:login');

    },
    error: function(data) {
      alert('Error, contact the admin');
    }
  });
}

function register() {
	console.log('fock');
}

function openLoginFacebook() {
  fb.authorize();
}

function openLoginDuppp() {
  var t = Titanium.UI.create2DMatrix();
  t = t.scale(0);

  $.userLoginDuppp.transform = t;

  // create first transform to go beyond normal size
  var t1 = Titanium.UI.create2DMatrix();
  t1 = t1.scale(1.1);
  var a = Titanium.UI.createAnimation();
  a.transform = t1;
  a.duration = 200;

  // when this animation completes, scale to normal size
  a.addEventListener('complete', function() {
    var t2 = Titanium.UI.create2DMatrix();
    t2 = t2.scale(1.0);
    $.userLoginDuppp.animate({transform:t2, duration:200});

  });

  $.userLoginDuppp.open(a);
}

function openRegisterDuppp() {
  var t = Titanium.UI.create2DMatrix();
  t = t.scale(0);

  $.userRegisterDuppp.transform = t;

  // create first transform to go beyond normal size
  var t1 = Titanium.UI.create2DMatrix();
  t1 = t1.scale(1.1);
  var a = Titanium.UI.createAnimation();
  a.transform = t1;
  a.duration = 200;

  // when this animation completes, scale to normal size
  a.addEventListener('complete', function() {
    var t2 = Titanium.UI.create2DMatrix();
    t2 = t2.scale(1.0);
    $.userRegisterDuppp.animate({transform:t2, duration:200});

  });

  $.userRegisterDuppp.open(a);
}

fb.addEventListener("login", facebook);

function facebook (e) {
  if (e.success) {
    var fbuid = fb.getUid();
    var fbAccessToken = fb.getAccessToken();

    var user = {
      service: "facebook",
      id: fbuid,
      accesstoken: fbAccessToken
    };

    // Create a connection
    var xhr3 = Titanium.Network.createHTTPClient();

    xhr3.setRequestHeader('Content-Type','application/json; charset=utf-8');

    // Open the connection using POST
    xhr3.open("POST", urlFB);

    // Send the connection and the user object as argument
    xhr3.send(user);

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

        // Set a global variable
        Titanium.App.Properties.setInt("userUid", data.user.uid);
        Titanium.App.Properties.setInt("userSessionId", data.sessid);
        Titanium.App.Properties.setInt("userSessionName", data.sesion_name);

        Titanium.API.fireEvent('user:login');
      }
      else {
        alert("There was an error");
      }
    };

  }
  else if (e.error) {
    alert(e.error);
  }
}

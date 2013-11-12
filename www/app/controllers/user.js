/*
 *  Initialize variables
 */

// Facebook Button
var drupalServices = require('drupalServices');
var APP = require('core');

function login(e){

  // Create an object to hold the data entered in the form
  drupalServices.userLogin(
    $.loginUsr.value,
    $.loginPwd.value,
    function(data) {

      drupalServices.getToken(
        function(_data) {
          // Close the window.
          $.userLoginDuppp.close();

          APP.startApp();
        }
      );

    },
    function(data) {
      alert('Error, contact the admin');
    }
  );
}

function register() {

	// Create an object to hold the data entered in the form
  drupalServices.userRegister(
    {
      name: $.usernameField.value,
      mail: $.emailField.value,
      pass: $.passwordRegisterField.value,
      status: 1
    },
    function(data) {

      // Close the window.
      $.userRegisterDuppp.close();

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
    },
    function(data) {
      alert(data.responseText.form_errors);
    }
  );
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
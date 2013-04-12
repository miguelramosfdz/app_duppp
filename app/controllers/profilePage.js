Ti.include('config.js');

var args = arguments[0] || {};

// Create another connection to get the user
var url = REST_PATH + '/user/' + args + '.json';

var xhr = Ti.Network.createHTTPClient({
  onload: function() {
    var user = JSON.parse(this.responseText);

    console.log(user);

      // map fields with correct values.
    $.author.text = user.name;
  },
  onerror: function(e) {
      Ti.API.debug(e.error);
      alert('error');
  },
  timeout: 5000
});

$.profilePage.addEventListener('open', function() {
  xhr.open("GET", url);
  xhr.send();
});


Ti.include('config.js');

var args = arguments[0] || {};

// Create another connection to get the user
var url = REST_PATH + '/duppp_user/' + args + '.json',
  urlFollow = REST_PATH + '/duppp_user/' + args + '/flag',
  ajax = Titanium.Network.ajax;

var xhr = Ti.Network.createHTTPClient({
  onload: function() {
    var user = JSON.parse(this.responseText);

    if (user.is_flagged) {
      $.follow.title = 'Unfollow';
    } else {
      $.follow.title = 'Follow';
    }

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

function follow () {
  if ($.follow.title === 'Follow') {
    var data = {
      "action": "flag"
    };
  } else {
    var data = {
      "action": "unflag"
    };
  }

  ajax({
    type: "POST",
    url: urlFollow,
    data: JSON.stringify(data), // Stringify the node
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      if ($.follow.title === 'Follow') {
        $.follow.title = 'Unfollow';
      } else {
        $.follow.title = 'Follow';
      }
    }
  });
}


Ti.include('config.js');

var args = arguments[0] || {};

// Create another connection to get the user
var drupalServices = require('drupalServices');

$.profilePage.addEventListener('open', function() {
  drupalServices.userRetrieve({
    uid: args,
    success: function(user) {
      // Check if user si flagged by the current user.
      if (user.is_flagged) {
        $.follow.title = 'Unfollow';
      } else {
        $.follow.title = 'Follow';
      }
      // map fields with correct values.
      $.author.text = user.name;
    },
    error: function(data) {
      alert('error');
    }
  });
});

function follow () {

  var data;

  if ($.follow.title === 'Follow') {
    data = {
      "action": "flag"
    };
  } else {
    data = {
      "action": "unflag"
    };
  }

  drupalServices.followUser({
    node: data,
    uid: args,
    success: function(user) {
      if ($.follow.title === 'Follow') {
        $.follow.title = 'Unfollow';
      } else {
        $.follow.title = 'Follow';
      }
    },
    error: function(data) {
      alert('error');
    }
  });
}


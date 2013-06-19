

// Create another connection to get the user
var drupalServices = require('drupalServices'),
  args = arguments[0] || {};

$.profilePage.addEventListener('open', function() {

  $.authorImage.image = args.field_avatar;
  $.followerCount.text = args.follower_count;

  drupalServices.userRetrieve({
    uid: args.uid,
    success: function(user) {
      // Check if user si flagged by the current user.
      if (user[0].is_flagged) {
        $.follow.title = 'Unfollow';
      } else {
        $.follow.title = 'Follow';
      }
      // map fields with correct values.
      $.followerCount.text = user[0].follow_count;
      $.eventCount.text = user[0].event_count;
      $.author.text = user[0].name;
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
    uid: args.uid,
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

